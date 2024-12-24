"use client";

import { TransferMode, TransferStatus } from "@/types/enums";
import {
    FileTransferContextValue,
    FileTransferState,
    TransferBaseDataType,
    TransferCreateDataType,
} from "@/types/state";
import {
    generateTransferUrl,
    inZip,
    isFileSizeExceeded,
} from "@circulate/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useReducer,
} from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { addTransferLog, getUploadSignedURL } from "../actions/transfer";
import { fileTransferReducer } from "../reducers/file-transfer-reducers";

export const transferDataInitialState = {
    transferKey: "",
    transferName: "",
    transferMessage: "",
    transferMode: TransferMode.MANUAL_SEND,
    fileSize: 0,
    fileType: "",
    fileIsPasswordEnabled: false,
    filePassword: "",
    recipientEmail: "",
    userId: "",
}
const initialState: FileTransferState = {
    files: [],
    error: null,
    transfer_status: TransferStatus.COMPLETE,
    transfer_data:transferDataInitialState,
    generatedTransferLink: null,
    transfered_data_percentage: 0,
};

const FileTransferContext = createContext<FileTransferContextValue | undefined>(
    undefined
);

const FileTransferContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data: session } = useSession();
    const [state, dispatch] = useReducer(fileTransferReducer, initialState);

    const MAX_FILE_SIZE_MB = 200;

    const handleAddFiles = useCallback((files: File[]) => {
        if (!files || files.length === 0) {
            toast.error("No files were provided. Please select files to upload.");
            console.error("File addition failed: No files provided.");
            return;
        }
        dispatch({ type: "ADD_FILE", payload: files });
    }, []);

    const handleRemoveFiles = useCallback((file: File) => {
        if (!file) {
            toast.error("Invalid file. Please try again.");
            console.error("File removal failed: Invalid file.");
            return;
        }
        dispatch({ type: "REMOVE_FILE", payload: file });
    }, []);

    const handleTransferStatusChange = useCallback((status: TransferStatus) => {
        if (!status) {
            console.warn(
                "Attempted to update transfer status with an invalid value."
            );
            return;
        }
        dispatch({ type: "CHANGE_TRANSFER_STATUS", payload: status });
    }, []);

    const handleTransferedDataPercentageChanges = useCallback(
        (percentage: number) => {
            if (percentage < 0 || percentage > 100) {
                console.warn(
                    "Percentage value out of bounds (0-100). Skipping update."
                );
                return;
            }
            dispatch({
                type: "CHANGE_TRANSFERED_DATA_PERCENTAGE",
                payload: percentage,
            });
        },
        []
    );

    const handleAppendTransferData = useCallback(
        (transferData: TransferBaseDataType) => {
            if (!transferData) {
                toast.error("Failed to update transfer details. Please try again.");
                console.error("Transfer data append failed: Invalid data.");
                return;
            }
            dispatch({ type: "APPEND_TRANSFER_DATA", payload: transferData });
        },
        []
    );

    const handleSetTransferUrl = useCallback((transferUrl: string | null) => {
        if (!transferUrl) {
            toast.error("Failed to generate a transfer link. Please try again.");
            console.error("Transfer URL generation failed.");
            return;
        }
        dispatch({ type: "SET_TRANSFER_URL", payload: transferUrl });
    }, []);

    const handleResetTransferState = useCallback(() => {
        dispatch({ type: "RESET_STATE"});
    }, []);

    const handleOnDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (!acceptedFiles || acceptedFiles.length === 0) {
                toast.error("No files were dropped. Please drop valid files.");
                console.error("File drop failed: No files provided.");
                return;
            }
            handleAddFiles(acceptedFiles);
        },
        [handleAddFiles]
    );

    const handleInitializeTransfer = async (
        transferData: TransferCreateDataType
    ) => {
        try {
            if (isFileSizeExceeded(state.files, MAX_FILE_SIZE_MB)) {
                toast.error(
                    `The total file size exceeds the ${MAX_FILE_SIZE_MB} MB limit.`
                );
                console.warn("Transfer initialization failed: File size exceeded.");
                return;
            }
            handleTransferStatusChange(TransferStatus.INITIALIZING);
            const fileDetails = await getFileDetails(state.files);
            if (!fileDetails) {
                toast.error("Unable to retrieve file details. Please try again.");
                handleTransferStatusChange(TransferStatus.INITIAL);
                return;
            }
            const reshapedTransferData: TransferBaseDataType = {
                ...transferData,
                fileSize: fileDetails.size,
                fileType: fileDetails.type,
                transferKey: fileDetails.key,
                userId: session?.user.userId || "",
                filePassword: transferData.fileIsPasswordEnabled
                    ? transferData.filePassword
                    : "",
                recipientEmail:
                    transferData.transferMode === TransferMode.EMAIL_SEND
                        ? transferData.recipientEmail
                        : "",
            };
            handleAppendTransferData(reshapedTransferData);
            const response = await getUploadSignedURL({
                fileType: fileDetails.type,
                fileSize: fileDetails.size,
                fileKey: fileDetails.key,
            });
            if (!response.success) {
                toast.error(
                    response.error || "Failed to get upload URL. Please try again."
                );
                console.error("Upload URL fetch failed:", response.error);
                handleTransferStatusChange(TransferStatus.INITIAL);
                return;
            }
            handleTransferStatusChange(TransferStatus.PROGRESS);
            const [uploadFileData, TransferLogData] = await Promise.all([
                uploadFile(response.data.url, fileDetails.blob, fileDetails.type),
                addTransferLog(reshapedTransferData),
            ]);

            if (TransferLogData.success && TransferLogData.data) {
                const transferUrl = generateTransferUrl(
                    process.env.NEXT_PUBLIC_TRANSFER_URL_BASE as string,
                    TransferLogData.data?.id
                );
                handleSetTransferUrl(transferUrl);
                handleTransferStatusChange(TransferStatus.COMPLETE);
                handleTransferedDataPercentageChanges(0);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
                console.error("Transfer log save failed:", TransferLogData);
            }
        } catch (err) {
            console.error("An error occurred during transfer initialization:", err);
            toast.error("An unexpected error occurred. Please try again.");
            handleTransferStatusChange(TransferStatus.INITIAL);
            handleTransferedDataPercentageChanges(0);
        }
    };

    const getFileDetails = async (
        files: File[]
    ): Promise<{
        type: string;
        size: number;
        blob: Blob;
        key: string;
    } | null> => {
        if (!files || files.length === 0) {
            console.warn("No files provided to retrieve details.");
            return null;
        }

        if (files.length > 1) {
            const { size, type, zipBlob } = await inZip(files);
            return { type, size, blob: zipBlob, key: `${uuidv4()}.zip` };
        }

        const file = files[0];
        if (!file) {
            console.warn("Single file is undefined.");
            return null;
        }

        return {
            type: file.type,
            size: file.size,
            blob: file,
            key: `${uuidv4()}.${file.name.split(".").pop()}`,
        };
    };

    const uploadFile = async (url: string, blob: Blob, contentType: string) => {
        if (!url || !blob || !contentType) {
            console.error(
                "Invalid upload parameters. Ensure all parameters are valid."
            );
            toast.error("Failed to upload file. Invalid parameters.");
            return;
        }

        await axios.put(url, blob, {
            headers: { "Content-Type": contentType },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    handleTransferedDataPercentageChanges(percentCompleted);
                }
            },
        });
    };

    const mutationFuncs = {
        handleAddFiles,
        handleOnDrop,
        handleRemoveFiles,
        handleTransferStatusChange,
        handleInitializeTransfer,
        handleTransferedDataPercentageChanges,
        handleAppendTransferData,
        handleResetTransferState
    };

    return (
        <FileTransferContext.Provider value={{ state, mutationFuncs }}>
            {children}
        </FileTransferContext.Provider>
    );
};

const useFileTransferContext = (): FileTransferContextValue => {
    const context = useContext(FileTransferContext);
    if (!context) {
        console.error(
            "useFileTransferContext must be used within a FileTransferContextProvider"
        );
        throw new Error(
            "useFileTransferContext must be used within a FileTransferContextProvider"
        );
    }
    return context;
};

export { FileTransferContextProvider, useFileTransferContext };

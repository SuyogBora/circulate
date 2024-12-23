"use client";

import { TransferMode, TransferStatus } from "@/types/enums";
import { FileTransferContextValue, FileTransferState, TransferBaseDataType, TransferCreateDataType } from "@/types/state";
import { inZip, isFileSizeExceeded } from "@circulate/utils";
import axios from "axios";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useReducer } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { getUploadSignedURL } from "../actions/transfer";
import { fileTransferReducer } from "../reducers/file-transfer-reducers";
import { useSession } from "next-auth/react";

const initialState: FileTransferState = {
    files: [],
    error: null,
    transfer_status: TransferStatus.INITIAL,
    transfer_data: {
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
    },
    transfered_data_percentage: 0
};


const FileTransferContext = createContext<FileTransferContextValue | undefined>(undefined);
const FileTransferContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data: session, status } = useSession()
    const [state, dispatch] = useReducer(fileTransferReducer, initialState);
    const handleAddFiles = useCallback((files: File[]) => {
        dispatch({ type: "ADD_FILE", payload: files });
    }, []);

    const handleRemoveFiles = useCallback((file: File) => {
        dispatch({ type: "REMOVE_FILE", payload: file });
    }, []);

    const handleTransferStatusChange = useCallback((status: TransferStatus) => {
        dispatch({ type: "CHANGE_TRANSFER_STATUS", payload: status });
    }, []);

    const handleTransferedDataPercentageChanges = useCallback((percenatage: number) => {
        dispatch({ type: "CHANGE_TRANSFERED_DATA_PERCENATEGE", payload: percenatage });
    }, []);

    const handleApendTransferData = useCallback((transferData: TransferBaseDataType) => {
        dispatch({ type: "APEND_TRANSFER_DATA", payload: transferData });
    }, []);

    const handleOnDrop = useCallback(
        (acceptedFiles: File[]) => {
            handleAddFiles(acceptedFiles);
        },
        [handleAddFiles]
    );

    const MAX_FILE_SIZE_MB = 200;

    const handleInitializeTransfer = async (transferData: TransferCreateDataType) => {

        try {
            if (isFileSizeExceeded(state.files, MAX_FILE_SIZE_MB)) {
                toast.error(`Total file size exceeds ${MAX_FILE_SIZE_MB} MB.`);
                return;
            }
            handleTransferStatusChange(TransferStatus.INITIALIZING);
           
            let fileDetails: { type: string; size: number; blob: Blob; key: string };
            if (state.files.length > 1) {
                const { size, type, zipBlob } = await inZip(state.files);
                fileDetails = {
                    type,
                    size,
                    blob: zipBlob,
                    key: `${uuidv4()}.zip`,
                };
            } else {
                const file = state.files[0] as File;
                fileDetails = {
                    type: file.type,
                    size: file.size,
                    blob: file,
                    key: `${uuidv4()}.${file.name.split(".").pop()}`,
                };
            }
            const reshapedTransferData: TransferBaseDataType = {
                ...transferData,
                fileSize: fileDetails.size,
                fileType: fileDetails.type,
                transferKey: fileDetails.key,
                userId:session?.user.id,
                filePassword: transferData.fileIsPasswordEnabled ? transferData.filePassword : "",
                recipientEmail: transferData.transferMode === TransferMode.EMAIL_SEND ? transferData.recipientEmail : "",
            };
            console.log(reshapedTransferData,"reshapedTransferData")
             handleApendTransferData(reshapedTransferData);
            // const response = await getUploadSignedURL({
            //     fileType: fileDetails.type,
            //     fileSize: fileDetails.size,
            //     fileKey: fileDetails.key,
            // });
            // if (response.success) {
            //     handleTransferStatusChange(TransferStatus.PROGRESS);
            //     const uploadResponse = await axios.put(response.data.url, fileDetails.blob, {
            //         headers: {
            //             "Content-Type": fileDetails.type,
            //         },
            //         onUploadProgress: (progressEvent) => {
            //             if (progressEvent.total) {
            //                 const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            //                 handleTransferedDataPercentageChanges(percentCompleted)
            //             }
            //         }
            //     });

            //     if (uploadResponse) {
            //         handleTransferStatusChange(TransferStatus.COMPLETE);
            //     }
            // } else {
            //     handleTransferStatusChange(TransferStatus.INITIAL);
            //     toast.error(response.error || "Failed to get upload URL.");
            // }
        } catch (err) {
            // toast.error("An unexpected error occurred.");
            // handleTransferStatusChange(TransferStatus.INITIAL);
        }
    };

    const mutationFuncs = {
        handleAddFiles,
        handleOnDrop,
        handleRemoveFiles,
        handleTransferStatusChange,
        handleInitializeTransfer,
        handleTransferedDataPercentageChanges,
        handleApendTransferData
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
        throw new Error("useFileTransferContext must be used within a FileTransferContextProvider");
    }
    return context;
};

export { FileTransferContextProvider, useFileTransferContext };

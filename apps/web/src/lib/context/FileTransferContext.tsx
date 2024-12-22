"use client";

import { TransferMode, TransferStatus } from "@/types/enums";
import { FileTransferAction, FileTransferContextValue, FileTransferState, TransferData } from "@/types/state";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useReducer } from "react";

const initialState: FileTransferState = {
    files: [],
    error: null,
    transfer_status: TransferStatus.INITIAL,
    transfer_data: {
        transferName: "",
        transferMessage: "",
        password: "",
        transferMode: TransferMode.MANUAL_SEND,
        recipientEmail: "",
        isPasswordEnabled: false,
    },
};

const fileTransferReducer = (state: FileTransferState, action: FileTransferAction): FileTransferState => {
    switch (action.type) {
        case "ADD_FILE":
            const newFiles = action.payload.filter(
                (newFile) => !state.files.some((existingFile) => existingFile.name === newFile.name)
            );
            return { ...state, files: [...state.files, ...newFiles] };
        case "REMOVE_FILE":
            const filteredFiles = state.files.filter((existingFile) => existingFile.name !== action.payload.name)
            return { ...state, files: filteredFiles }
        case "CHANGE_TRANSFER_STATUS":
            return { ...state,transfer_status:action.payload}
        default:
            return state;
    }
};

const FileTransferContext = createContext<FileTransferContextValue | undefined>(undefined);
const FileTransferContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(fileTransferReducer, initialState);

    const handleAddFiles = useCallback((files: File[]) => {
        dispatch({ type: "ADD_FILE", payload: files });
    }, []);

    const handleRemoveFiles = useCallback((file: File) => {
        dispatch({ type: "REMOVE_FILE", payload: file });
    }, []);

    const handleTransferStatusChange = useCallback((status:TransferStatus) => {
        dispatch({ type: "CHANGE_TRANSFER_STATUS", payload:status});
    }, []);

    const handleOnDrop = useCallback(
        (acceptedFiles: File[]) => {
            handleAddFiles(acceptedFiles);
        },
        [handleAddFiles]
    );

    const handleInitilizeTransfer = (transferData:TransferData)=>{
         handleTransferStatusChange(TransferStatus.INITIALIZING)
    };

    const mutationFuncs = {
        handleAddFiles,
        handleOnDrop,
        handleRemoveFiles,
        handleTransferStatusChange,
        handleInitilizeTransfer
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

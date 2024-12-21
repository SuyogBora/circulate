"use client";

import { FileTransferAction, FileTransferContextValue, FileTransferState } from "@/types/state";
import { createContext, FC, PropsWithChildren, useCallback, useContext, useReducer } from "react";

const initialState: FileTransferState = {
    files: [],
    uploading: false,
    error: null,
};

const fileTransferReducer = (state: FileTransferState, action: FileTransferAction): FileTransferState => {
    switch (action.type) {
        case "ADD_FILE":
            const newFiles = action.payload.filter(
                (newFile) => !state.files.some((existingFile) => existingFile.name === newFile.name)
            );
            return { ...state, files: [...state.files, ...newFiles] };
        default:
            return state;
    }
};

const FileTransferContext = createContext<FileTransferContextValue | undefined>(undefined);
const FileTransferContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(fileTransferReducer, initialState);

    const handleAddFiles = (files: File[]) => {
        dispatch({ type: "ADD_FILE", payload: files })
    };
    
    const handleOnDrop = useCallback(
        (acceptedFiles: File[]) => {
            handleAddFiles(acceptedFiles);
        },
        []
    );
    const mutationFuncs = {
        handleAddFiles,
        handleOnDrop
    }
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

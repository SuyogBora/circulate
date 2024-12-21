import { DropzoneOptions } from "react-dropzone";

export interface FileTransferState {
    files: File[];
    uploading: boolean;
    error: string | null;
}
export type FileTransferAction =
    | { type: "ADD_FILE"; payload: File[] }

export type MutationFuncs = {
    handleAddFiles: (files: File[]) => void,
    handleOnDrop:DropzoneOptions['onDrop']
}
export interface FileTransferContextValue {
    state: FileTransferState;
    mutationFuncs:MutationFuncs
}

import { DropzoneOptions } from "react-dropzone";
import { TransferStatus } from "./enums";
import { z } from "zod";
import { TransferInfoFormSchema } from "@/lib/validation/transfer";

export interface FileTransferState {
    files: File[];
    error: string | null;
    transfer_status:TransferStatus,
    transfer_data:TransferData
}
export type FileTransferAction =
    | { type: "ADD_FILE"; payload: File[] }
    | { type: "REMOVE_FILE"; payload: File}
    | { type: "CHANGE_TRANSFER_STATUS"; payload: TransferStatus}

export type MutationFuncs = {
    handleAddFiles: (files: File[]) => void,
    handleOnDrop:DropzoneOptions['onDrop'],
    handleRemoveFiles:(files: File) => void
    handleTransferStatusChange:(status:TransferStatus) => void
    handleInitilizeTransfer:(transferData:z.infer<typeof TransferInfoFormSchema>) => void
}
export interface FileTransferContextValue {
    state: FileTransferState;
    mutationFuncs:MutationFuncs
}

export type TransferData = z.infer<typeof TransferInfoFormSchema>;
import { TransferCreateSchema, TransferSchema } from "@/lib/validation/transfer";
import { DropzoneOptions } from "react-dropzone";
import { z } from "zod";
import { TransferStatus } from "./enums";

export interface FileTransferState {
    files: File[];
    error: string | null;
    transfer_status:TransferStatus,
    transfer_data:TransferBaseDataType,
    transfered_data_percentage:number
}
export type FileTransferAction =
    | { type: "ADD_FILE"; payload: File[] }
    | { type: "REMOVE_FILE"; payload: File}
    | { type: "CHANGE_TRANSFER_STATUS"; payload: TransferStatus}
    | { type: "CHANGE_TRANSFERED_DATA_PERCENATEGE"; payload: number}
    | { type: "APEND_TRANSFER_DATA"; payload: TransferBaseDataType}

export type MutationFuncs = {
    handleAddFiles: (files: File[]) => void,
    handleOnDrop:DropzoneOptions['onDrop'],
    handleRemoveFiles:(files: File) => void
    handleTransferStatusChange:(status:TransferStatus) => void
    handleInitializeTransfer:(transferData:TransferCreateDataType) => void
    handleTransferedDataPercentageChanges:(percentage:number) => void
    handleApendTransferData:(transferData:TransferBaseDataType) => void
}
export interface FileTransferContextValue {
    state: FileTransferState;
    mutationFuncs:MutationFuncs
}

export type TransferCreateDataType = z.infer<typeof TransferCreateSchema>;
export type TransferBaseDataType = z.infer<typeof TransferSchema>;
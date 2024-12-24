import { TransferStatus } from "@/types/enums";
import { FileTransferAction, FileTransferState } from "@/types/state";
import { transferDataInitialState } from "../context/FileTransferContext";

export const fileTransferReducer = (state: FileTransferState, action: FileTransferAction): FileTransferState => {
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
            return { ...state, transfer_status: action.payload }
        case "CHANGE_TRANSFERED_DATA_PERCENTAGE":
            return { ...state, transfered_data_percentage: action.payload }
        case "APPEND_TRANSFER_DATA":
            return { ...state, transfer_data: { ...action.payload } }
        case "SET_TRANSFER_URL":
            return { ...state, generatedTransferLink: action.payload }
        case "RESET_STATE":
            return {
                 files:[],
                 generatedTransferLink:null,
                 transfer_data:transferDataInitialState,
                 error:null,
                 transfer_status:TransferStatus.INITIAL,
                 transfered_data_percentage:0
            }
        default:
            return state;
    }
};
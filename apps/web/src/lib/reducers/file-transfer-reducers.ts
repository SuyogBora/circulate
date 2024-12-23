import { FileTransferAction, FileTransferState } from "@/types/state";

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
        case "CHANGE_TRANSFERED_DATA_PERCENATEGE":
            return { ...state, transfered_data_percentage: action.payload }
        case "APEND_TRANSFER_DATA":
            return { ...state, transfer_data: { ...action.payload } }
        default:
            return state;
    }
};
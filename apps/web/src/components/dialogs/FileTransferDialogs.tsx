"use client";

import { useFileTransferContext } from "@/lib/context/FileTransferContext";
import { TransferInfoFormSchema } from "@/lib/validation/transfer";
import { TransferMode, TransferStatus } from "@/types/enums";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@circulate/ui";
import { FC } from "react";
import { z } from "zod";
import TransferInformationForm from "../pages/transfer/TransferInformationForm";
import TransferInitializingUI from "../pages/transfer/TransferInitializingUI";

interface FileTransferDialogsProps {
  open: boolean;
  close: () => void;
  transferMode: TransferMode;
}

const FileTransferDialogs: FC<FileTransferDialogsProps> = ({ open, close, transferMode }) => {
  const {
    state: { files, transfer_status, transfer_data },
    mutationFuncs: { handleInitilizeTransfer, handleTransferStatusChange }
  } = useFileTransferContext();

  const handleSubmit = (data: z.infer<typeof TransferInfoFormSchema>) => {
    handleInitilizeTransfer(data);
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      handleTransferStatusChange(TransferStatus.INITIAL);
    }, 300);
  };

  const getDialogContent = () => {
    switch (transfer_status) {
      case TransferStatus.INITIAL:
        return {
          title: "Transfer Details",
          description: "Fill out the form below to configure your transfer. Click 'Save' to proceed."
        };
      case TransferStatus.INITIALIZING:
        return {
          title: "Initializing Transfer",
          description: "Your transfer is being initialized. Please wait for the process to complete."
        };
      case TransferStatus.PROGRESS:
        return {
          title: "Transfer in Progress",
          description: "Your transfer is currently in progress. Please do not close this dialog."
        };
      case TransferStatus.COMPLETE:
        return {
          title: "Transfer Complete",
          description: "Your transfer has been successfully completed. You can now close this dialog."
        };
      default:
        return {
          title: "Transfer Details",
          description: "Fill out the form below to configure your transfer. Click 'Save' to proceed."
        };
    }
  };

  const { title, description } = getDialogContent();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent hasCloseOption={false} className="sm:max-w-[425px] border-border">
        <DialogHeader>
          <DialogTitle className="mb-0.5">{title}</DialogTitle>
          <DialogDescription className="text-xs leading-[1.5]">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 pt-4">
          <TransferInformationForm
            handleClose={handleClose}
            initailsTransferData={transfer_data}
            isActiveStep={transfer_status === TransferStatus.INITIAL}
            files={files}
            handleSubmit={handleSubmit}
            transferMode={transferMode}
          />
          <TransferInitializingUI isActiveStep={transfer_status === TransferStatus.INITIALIZING} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileTransferDialogs;

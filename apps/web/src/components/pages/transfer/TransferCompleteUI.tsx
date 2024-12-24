import { Button, buttonVariants, DialogFooter, Input } from '@circulate/ui';
import { cn } from '@circulate/utils';
import { Copy, Globe } from 'lucide-react';
import { FC } from 'react';
import Lottie from 'react-lottie-player';
import CompleteJson from "../../../../public/asssets/lotties/complete.json";
import CopyToClipboardButton from '@/components/common/CopyToClipboardButton';
import { toast } from 'sonner';
import Link from 'next/link';

interface TransferCompleteUIProps {
  className?: string;
  isActiveStep: boolean;
  generatedTransferLink: string | null;
  handleClose: () => void,
}

const TransferCompleteUI: FC<TransferCompleteUIProps> = ({ isActiveStep, className, handleClose, generatedTransferLink }) => {
  return (
    <div
      className={cn(
        "flex items-center flex-col gap-4 text-center",
        {
          hidden: !isActiveStep,
        },
        className
      )}
    >
      <div className="w-full">
        <div className="lottie_wrapper -mt-8">
          <Lottie
            loop
            animationData={CompleteJson}
            play
            className='mx-auto'
            style={{ width: 200, height: 200 }}
          />
        </div>
        {
          true && (
            <div className="w-full relative p-3 rounded-sm border border-border text-start">
              <div className="mb-2 last:mb-0 flex items-center justify-between">
                <h4 className='text-xs'>Generated Transfer Link</h4>
                <div className="flex items-center gap-1">
                  <Link
                    href={"/"}
                    className={cn(buttonVariants({ className: 'text-[10px] h-auto py-1 px-2.5 gap-1 border border-secondary', variant: "secondary" }))}
                  >
                    <span> <Globe className="!w-2.5 !h-2.5 flex-shrink-0" /></span> Visit
                  </Link>
                  <CopyToClipboardButton onCopied={() => toast.success("The transfer link has been successfully copied. You can now share it.")} textToCopy={""} className='' />
                </div>
              </div>
              <div className="mb-2 last:mb-0 flex items-center justify-between">
                <h4 className='text-xs'>File Secrete</h4>
                <CopyToClipboardButton onCopied={() => toast.success("The transfer link has been successfully copied. You can now share it.")} textToCopy={""} className='' />
              </div>
            </div>
          )
        }
      </div>
      <DialogFooter className="w-full">
        <Button type="button" variant={"destructive"} className="w-full" onClick={handleClose}>Close</Button>
      </DialogFooter>
    </div>
  );
};

export default TransferCompleteUI;

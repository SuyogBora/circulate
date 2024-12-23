import { Button, DialogFooter } from '@circulate/ui';
import { cn } from '@circulate/utils';
import { CircleCheckBig } from 'lucide-react';
import { FC } from 'react';
import Lottie from 'react-lottie-player';
import CompleteJson from "../../../../public/asssets/lotties/complete.json";

interface TransferCompleteUIProps {
  className?: string;
  isActiveStep: boolean;
  handleClose: () => void,
}

const TransferCompleteUI: FC<TransferCompleteUIProps> = ({ isActiveStep, className,handleClose }) => {
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
      <div className="">
        <div className="lottie_wrapper -mt-8">
          <Lottie
            loop
            animationData={CompleteJson}
            play
            className='mx-auto'
            style={{ width: 200, height: 200 }}
          />
        </div>
        <div className="space-y-2 -mt-8">
          <ul>
            <li className='text-sm mb-2 last:mb-0 font-semibold flex items-center gap-2 justify-center'> <span><CircleCheckBig className='text-green-600 size-4' /></span> Securing your transfer details...</li>
            <li className='text-sm mb-2 last:mb-0 font-semibold flex items-center gap-2 justify-center'> <span><CircleCheckBig className='text-green-600 size-4' /></span> Saving your information...</li>
            <li className='text-sm mb-2 last:mb-0 font-semibold flex items-center gap-2 justify-center'> <span><CircleCheckBig className='text-green-600 size-4' /></span> Preparing to start the transfer...</li>
          </ul>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-4 leading-[1.8]">
        This process ensures your transfer is safe and secure. Thank you for your patience!
      </p>
      <DialogFooter className="w-full">
        <Button type="button" variant={"destructive"} className="w-full" onClick={handleClose}>Cancel</Button>
      </DialogFooter>
    </div>
  );
};

export default TransferCompleteUI;

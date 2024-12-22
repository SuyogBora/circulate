import { cn } from '@circulate/utils';
import { FC } from 'react';
import Lottie from 'react-lottie-player';
import LoadingJson from "../../../../public/asssets/lotties/loading.json";

interface TransferInitializingUIProps {
  className?: string;
  isActiveStep: boolean;
}

const TransferInitializingUI: FC<TransferInitializingUIProps> = ({ isActiveStep, className }) => {
  return (
    <div
      className={cn(
        "",
        {
          hidden: !isActiveStep,
        },
        className
      )}
    >
      <div className="lottie_wrapper">
        <Lottie
          loop
          animationData={LoadingJson}
          play
          style={{ width: 250, height: 250 }}
        />
      </div>
      <div className="space-y-2">
        <ul>
          <li className='text-sm '>✔️ Securing your transfer details...</li>
          <li className='text-sm '>✔️ Saving your information...</li>
          <li className='text-sm '>✔️ Preparing to start the transfer...</li>
        </ul>
      </div>
      <p className="text-xs text-muted-foreground">
        This process ensures your transfer is safe and secure. Thank you for your patience!
      </p>
    </div>
  );
};

export default TransferInitializingUI;

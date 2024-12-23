import { Button, DialogFooter } from '@circulate/ui';
import { cn } from '@circulate/utils';
import { FC } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

interface TransferInProgressUIProps {
    className?: string;
    isActiveStep: boolean;
    transfered_data_percentage: number;
    handleClose: () => void,
}

const TransferInProgressUI: FC<TransferInProgressUIProps> = ({ isActiveStep, className, transfered_data_percentage, handleClose }) => {
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
                <div className="lottie_wrapper">
                    <CircularProgressbar value={transfered_data_percentage} text={`${transfered_data_percentage}%`} className='w-32 h-32' strokeWidth={10}
                        styles={buildStyles({
                            rotation: 0.25,
                            textSize: '16px',
                            pathTransitionDuration: 0.5,
                            pathColor: `#16a34a`,
                            textColor: '#ffffff',
                        })}
                    />
                </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-[1.8]">
                This process ensures your transfer is safe and secure. Thank you for your patience!
            </p>
            <DialogFooter className="w-full">
                <Button type="button" variant={"destructive"} className="w-full" onClick={handleClose}>Cancel</Button>
            </DialogFooter>
        </div>
    )
}

export default TransferInProgressUI
"use client";

import FileTransferDialogs from '@/components/dialogs/FileTransferDialogs';
import { TransferMode } from '@/types/enums';
import { Button } from '@circulate/ui';
import { Link2, Mail } from 'lucide-react';
import { FC, useState } from 'react';

interface TransferActionHeaderProps {
}

const TransferActionHeader: FC<TransferActionHeaderProps> = ({}) => {
    const [open,setOpen] = useState<boolean>(false);
    const [transferMode,setTransferMode] = useState<TransferMode>(TransferMode.MANUAL_SEND);

    const handleButtonClick = (mode:TransferMode)=>{
        setTransferMode(mode)
        setOpen(true)
    }
    return (
        <>
            <div className="mb-3 flex items-center justify-between">
                <div className="border border-border font-semibold text-xs py-2 px-4 rounded-md bg-secondary flex items-center gap-2">
                    <h5 className=''>Transfer Size</h5>
                    <span className=' text-green-600'>1200Kb</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button onClick={()=>handleButtonClick(TransferMode.MANUAL_SEND)} className='text-xs py-2 h-auto' variant={"default"} size={"sm"}> <span><Link2 /></span> Get Transfer Link</Button>
                    <Button onClick={()=>handleButtonClick(TransferMode.EMAIL_SEND)} className='text-xs py-2 h-auto' variant={"default"} size={"sm"}> <span><Mail /></span> Send Via Email</Button>
                </div>
            </div>
            <FileTransferDialogs open={open} close={()=>setOpen(false)} transferMode={transferMode}/>
        </>
    )
}

export default TransferActionHeader
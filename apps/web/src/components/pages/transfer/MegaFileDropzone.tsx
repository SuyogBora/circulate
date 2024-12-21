"use client";

import { useFileTransferContext } from '@/lib/context/FileTransferContext';
import { cn } from '@circulate/utils';
import { FC, PropsWithChildren } from 'react';
import { useDropzone } from 'react-dropzone';

interface MegaFileDropzoneProps extends PropsWithChildren {
    className?: string;
}

const MegaFileDropzone: FC<MegaFileDropzoneProps> = ({ children, className }) => {
    const { mutationFuncs } = useFileTransferContext();
    const { handleOnDrop } = mutationFuncs;
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleOnDrop, noClick: true });
    return (
        <div
            {...getRootProps()}
            className={cn("relative", className)}
        >
            <div className="">
                {
                    isDragActive && (
                        <div className="backdrop absolute top-0 left-0 w-full h-full bg-input flex items-center justify-center">
                            <h2 className='text-center text-primary'>Drop The Files Here</h2>
                        </div>)
                }
                <input {...getInputProps()} className="hidden" />
            </div>
            {children}
        </div>
    );
};

export default MegaFileDropzone;

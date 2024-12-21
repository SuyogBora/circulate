"use client";
import { useFileTransferContext } from "@/lib/context/FileTransferContext";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@circulate/ui";
import { Trash2 } from 'lucide-react';
import { FC } from 'react';
import TransferActionHeader from "./TransferActionHeader";

interface BrowsedFilesTablesProps { }

const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const BrowsedFilesTables: FC<BrowsedFilesTablesProps> = () => {
    const { state: { files } } = useFileTransferContext();
    const isDisabled = files.length == 0
    return (
        <>
            {
                !isDisabled && <TransferActionHeader />
            }

            <div className="overflow-x-auto border border-border rounded-md mt-4">
                <Table>
                    <TableHeader>
                        <TableRow className='border-border'>
                            <TableHead className='text-xs border-e border-border last:border-e-0 py-2.5 h-auto'>File Name</TableHead>
                            <TableHead className='text-xs border-e border-border last:border-e-0 py-2.5 h-auto'>Type</TableHead>
                            <TableHead className='text-xs border-e border-border last:border-e-0 py-2.5 h-auto'>Size</TableHead>
                            <TableHead className='text-xs border-e border-border last:border-e-0 py-2.5 h-auto w-[60px]'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {files.length > 0 ? (
                            files.map((file: File, index: number) => (
                                <TableRow key={index} className='border-border'>
                                    <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 h-auto'>{file.name}</TableCell>
                                    <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 h-auto'>{file.type || "Unknown"}</TableCell>
                                    <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 h-auto'>{formatFileSize(file.size)}</TableCell>
                                    <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 h-auto w-[60px]'>
                                        <Button variant={"outline"} size={"icon"} className='w-6 h-6'>
                                            <Trash2 className='!size-3 text-red-500' />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    <div className="h-[120px] flex items-center justify-center">
                                        No files selected.
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default BrowsedFilesTables;

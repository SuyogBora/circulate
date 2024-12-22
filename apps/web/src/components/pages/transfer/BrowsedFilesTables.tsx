"use client";
import { useFileTransferContext } from "@/lib/context/FileTransferContext";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@circulate/ui";
import { FC } from 'react';
import BrowsedFileRow from "./BrowsedFileRow";
import TransferActionHeader from "./TransferActionHeader";

interface BrowsedFilesTablesProps { }


const BrowsedFilesTables: FC<BrowsedFilesTablesProps> = () => {
    const { state: { files },mutationFuncs:{handleRemoveFiles} } = useFileTransferContext();
    return (
        <>
            {
                files.length !== 0 && <TransferActionHeader/>
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
                               <BrowsedFileRow key={file.name} file={file} handleRemoveFiles={handleRemoveFiles}/>
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

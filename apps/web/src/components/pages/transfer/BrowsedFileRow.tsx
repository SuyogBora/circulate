import { Button, TableCell, TableRow } from '@circulate/ui'
import { formateFileSize } from '@circulate/utils'
import { Trash2 } from 'lucide-react'
import { FC } from 'react'

interface BrowsedFileRowProps {
    handleRemoveFiles:(file:File)=>void
    file:File
}

const BrowsedFileRow: FC<BrowsedFileRowProps> = ({file,handleRemoveFiles}) => {
    return (
        <TableRow  className='border-border'>
            <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 h-auto'>{file.name}</TableCell>
            <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 h-auto'>{file.type || "Unknown"}</TableCell>
            <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 h-auto'>{formateFileSize(file.size)}</TableCell>
            <TableCell className='text-xs border-e border-border last:border-e-0 font-medium py-1.5 h-auto w-[60px]'>
                <Button variant={"outline"} size={"icon"} className='w-6 h-6' onClick={() => handleRemoveFiles(file)}>
                    <Trash2 className='!size-3 text-red-500' />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default BrowsedFileRow
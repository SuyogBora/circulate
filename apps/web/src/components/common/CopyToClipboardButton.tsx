import { Button } from '@circulate/ui';
import { cn } from '@circulate/utils';
import copy from 'copy-to-clipboard';
import { Copy } from 'lucide-react';
import { FC } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ClipboardButtonProps {
    className?: string;
    textToCopy: string;
    onCopied?: (coppiedText: string) => void;
}

const ClipboardButton: FC<ClipboardButtonProps> = ({ textToCopy, onCopied, className }) => {
    return (
        <CopyToClipboard text={textToCopy} onCopy={() => {
            if (typeof onCopied === "function") {
                onCopied(textToCopy)
            }
        }
        }>
            <Button
                className={cn('text-[10px] h-auto py-1 px-2.5 gap-1', className)}
                variant="outline"
            >
              <span> <Copy className="!w-2.5 !h-2.5 flex-shrink-0" /></span> Copy
            </Button>
        </CopyToClipboard >
    );
};

export default ClipboardButton;

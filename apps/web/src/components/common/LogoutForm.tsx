import { doLogout } from '@/lib/actions/auth';
import { Button } from '@circulate/ui';
import { LogOut } from 'lucide-react';
import { FC } from 'react';

interface LogoutFormProps {
}

const LogoutForm: FC<LogoutFormProps> = ({ }) => {
    return (
        <form action={doLogout} className='w-full'>
            <Button className="cursor-default select-none  gap-2 rounded-sm px-2 justify-start py-1.5 h-auto text-xs outline-none transition-colors focus:bg-accent focus:text-accent-foreground w-full" variant={"ghost"}>
                <LogOut />
                <span>Log out</span>
            </Button>
        </form>
    )
}

export default LogoutForm
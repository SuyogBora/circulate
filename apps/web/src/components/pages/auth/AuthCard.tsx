import { FC, PropsWithChildren } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@circulate/ui"

interface AuthCardProps extends PropsWithChildren{
    title?:string,
    description?:string
}

const AuthCard: FC<AuthCardProps> = ({children,title,description}) => {
    return (
        <Card className="max-w-[440px] w-full">
            <CardHeader className='border-b border-border px-4 py-2.5'>
                <CardTitle className='mb-0.5 text-2xl'>{title}</CardTitle>
                <CardDescription className='text-xs'>{description}</CardDescription>
            </CardHeader>
            <CardContent className='px-4 py-2.5'>
                {children}
            </CardContent>
        </Card>
    )
}

export default AuthCard
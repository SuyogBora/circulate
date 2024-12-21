import IconGithub from '@/components/icons/IconGithub';
import IconGoogle from '@/components/icons/IconGoogle';
import { doSocialLogin } from '@/lib/actions/auth';
import { Button } from '@circulate/ui';
import { FC } from 'react';
interface SocialAuthFormProps {
}
const SocialAuthForm: FC<SocialAuthFormProps> = ({ }) => {
    const doSocialLoginWithRedirect = doSocialLogin.bind(null, "/")
    return (
        <form action={doSocialLoginWithRedirect}>
            <div className='grid grid-cols-1 gap-2'>
                <Button type="submit" name="action" value="google" className='text-xs py-3.5 h-auto'>
                    <IconGoogle /> Sign In With Google
                </Button>
                <Button type="submit" name="action" value="github" className='text-xs py-3.5 h-auto'>
                    <IconGithub /> Sign In With Github
                </Button>
            </div>
        </form>
    )
}

export default SocialAuthForm
import Footer from '@/components/common/Footer'
import Header from '@/components/layout/auth/Header'
import { FC, PropsWithChildren } from 'react'

interface AuthLayoutProps extends PropsWithChildren {

}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return (
        <>
            <Header/>
            <main className='auth-main-wrapper'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default AuthLayout
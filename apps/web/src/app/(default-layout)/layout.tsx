import Footer from '@/components/common/Footer'
import Header from '@/components/layout/default/Header'
import { FC, PropsWithChildren } from 'react'

interface DefaultLayoutProps extends PropsWithChildren {

}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <>
            <Header/>
            <main className='min-h-[calc(100vh-45px)] pt-[56px]'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default DefaultLayout
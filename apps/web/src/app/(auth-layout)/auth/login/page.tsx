import AuthCard from '@/components/pages/auth/AuthCard'
import SocialAuthForm from '@/components/pages/auth/SocialAuthForm'
import { Container } from '@circulate/ui'
import { FC } from 'react'

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  return (
    <section className=''>
      <Container>
        <div className="page-content w-full py-20 grid place-items-center min-h-[calc(100vh-95px)]">
          <AuthCard title='Sign In' description='Login To Start Using Advance Features'>
            <div className="py-2">
              <SocialAuthForm />
            </div>
          </AuthCard>
        </div>
      </Container>
    </section>
  )
}

export default page
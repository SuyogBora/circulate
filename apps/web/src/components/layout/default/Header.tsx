
import ProfileDropdown from '@/components/common/ProfileDropdown';
import { ModeToggle } from '@/components/common/ThemeToogle';
import { Container } from '@circulate/ui';
import Link from 'next/link';
import { FC, Suspense } from 'react';

interface HeaderProps {
}
const Header: FC<HeaderProps> = ({ }) => {
  return (
    <header className='py-2 border-b border-border fixed top-0 start-0 w-full z-50 bg-background'>
        <Container>
        <div className="header-content flex items-center justify-between">
          <div className="logo-part">
            <Link href={"/"} className='text-xl font-semibold'>Circulate</Link>
          </div>
          <div className="flex items-center gap-2">
           <ModeToggle/>
            <Suspense fallback={"loading"}>
              <ProfileDropdown />
            </Suspense> 
          </div>
        </div>
        </Container>
    </header>
  )
}

export default Header
import { Container } from "@circulate/ui"
import Link from "next/link"

const Header = ({ }) => {
    return (
        <header className='py-2 border-b border-border'>
            <Container>
                <div className="header-content">
                    <div className="logo-part">
                        <Link href={"/"} className='text-xl font-semibold'>Circulate</Link>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header
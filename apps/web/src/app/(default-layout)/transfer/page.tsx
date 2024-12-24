
import BrowsedFilesTables from '@/components/pages/transfer/BrowsedFilesTables'
import MegaFileDropzone from '@/components/pages/transfer/MegaFileDropzone'
import MiniFileDropzone from '@/components/pages/transfer/MiniFileDropzone'
import { Container } from '@circulate/ui'
import { FC } from 'react'

interface TransferPageProps {

}

const TransferPage: FC<TransferPageProps> = ({ }) => {
  return (
    <section className=''>
      <MegaFileDropzone className='min-h-[calc(100vh-102px)] w-full py-10'>
          <Container>
          <div className="max-w-[800px] mx-auto w-full">
            <MiniFileDropzone />
            <div className="mt-4">
              <BrowsedFilesTables/>
            </div>
          </div>
          </Container>
      </MegaFileDropzone>
    </section>
  )
}

export default TransferPage

import BrowsedFilesTables from '@/components/pages/transfer/BrowsedFilesTables'
import MegaFileDropzone from '@/components/pages/transfer/MegaFileDropzone'
import MiniFileDropzone from '@/components/pages/transfer/MiniFileDropzone'
import { FC } from 'react'

interface TransferPageProps {

}

const TransferPage: FC<TransferPageProps> = ({ }) => {
  return (
    <section className=''>
      <MegaFileDropzone className='min-h-[calc(100vh-102px)] w-full py-10'>
          <div className="max-w-[800px] mx-auto w-full">
            <MiniFileDropzone />
            <div className="mt-4">
              <BrowsedFilesTables/>
            </div>
          </div>
      </MegaFileDropzone>
    </section>
  )
}

export default TransferPage
import PlatformHeader from '@/components/PlatformHeader'
import { notFound } from 'next/navigation'
import { getBaseUrl } from '@/utils/getBaseUrl'
import NotesList from './NotesList'

const NotesPage = async ({ params }: { params: { platform_name: string } }) => (
  <>
    <PlatformHeader
      active={params.platform_name}
      title={'Notes'}
      subtitle={
        <>
          Add your insights and notes on <strong className='capitalize'>{params.platform_name}</strong>
        </>
      }
      mainMenu={[{ value: '/', label: 'GO BACK' }]}
    />
    <NotesList platform={params.platform_name} />
  </>
)

export default NotesPage

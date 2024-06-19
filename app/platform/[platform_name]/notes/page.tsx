import PlatformHeader from '@/components/PlatformHeader'
import { notFound } from 'next/navigation'
import AddNote from './AddNote'
import NoteCard from '@/components/NoteCard'

const NotesPage = async ({ params }: { params: { platform_name: string } }) => {
  const { platform_name } = params
  const url = `http://localhost:3000/api/platforms/${platform_name}/notes`
  const response = await fetch(url)
  if (!response.ok) {
    notFound()
    return null
  }

  const { notes } = await response.json()

  return (
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
      <div className='flex flex-col gap-4'>
        {(
          notes as {
            id: number | string
            note: string
            title: string
          }[]
        ).map((note) => (
          <NoteCard key={note.id} {...note} />
        ))}
      </div>
      <AddNote />
    </>
  )
}

export default NotesPage

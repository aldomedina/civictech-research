// AssessmentList.tsx
'use client'
import AssessmentCard from '@/components/AssessmentCard'
import BottomCTA from '@/components/BottomCTA'
import CommentInput from '@/components/CommentInput'
import NoteCard from '@/components/NoteCard'
import Spinner from '@/components/Spinner'
import { INote } from '@/types'
import { useEffect, useState } from 'react'

const NotesList = ({ platform }: { platform: string }) => {
  const [data, setData] = useState<INote[]>([])

  const [newNoteOpen, setNewNoteOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const response = await fetch(`/api/platforms/${platform}/notes`)
        if (response.ok) {
          const data = await response.json()
          setData(data)
        }
      } catch (error) {
        console.error('Error fetching platforms:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPlatforms()
  }, [platform])

  const handleNoteSubmit = async (newNote: string) => {
    if (!newNote.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/platforms/${platform}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: newNote }),
      })

      if (response.ok) {
        const note = await response.json()
        setData((prevNotes) => [note, ...prevNotes])
        setNewNoteOpen(false)
      } else {
        console.error('Failed to add note', await response.text())
      }
    } catch (error) {
      console.error('Error adding note:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleNoteUpdate = async (note: string, noteId: string | number) => {
    if (!note.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/platforms/${platform}/notes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note, noteId }),
      })

      if (response.ok) {
        const updatedNote = await response.json()
        setData((prevNotes) => prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
      } else {
        console.error('Failed to update note', await response.text())
      }
    } catch (error) {
      console.error('Error updating note:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleNoteRemove = async (noteId: string | number) => {
    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/platforms/${platform}/notes`, {
        method: 'DELETE',
        body: JSON.stringify({ noteId }),
      })

      if (response.ok) {
        setData((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
      } else {
        console.error('Failed to delete note', await response.text())
      }
    } catch (error) {
      console.error('Error deleting note:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className='h-24 w-full grid place-items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <>
      {newNoteOpen && (
        <>
          <span className='mb-2 text-gray-400 text-xs'>NEW NOTE</span>
          <div className='bg-gray-200 flex flex-col gap-4 p-8 mb-6 items-end rounded-md'>
            <CommentInput
              isNote
              isSubmitting={isSubmitting}
              comment=''
              onCancel={() => setNewNoteOpen(false)}
              onSave={handleNoteSubmit}
            />
          </div>
        </>
      )}
      {data.length ? (
        <div className='flex flex-col mb-6 md:grid gap-4 md:grid-cols-2 md:grid-rows-2'>
          {data.map((note) => (
            <NoteCard key={note.id} {...note} onNoteUpdate={handleNoteUpdate} onNoteRemove={handleNoteRemove} />
          ))}
        </div>
      ) : newNoteOpen ? null : (
        <div className='bg-gray-100 p-4 h-48  flex flex-col justify-center items-center gap-4 mb-4 rounded-lg'>
          <h3 className=' text-xl'>You haven&apos;t added any notes yet.</h3>
          <p className='opacity-50 font-light'>Click the button below to add your first note.</p>
        </div>
      )}
      <BottomCTA text='+' onClick={() => setNewNoteOpen(true)} disabled={newNoteOpen} />
    </>
  )
}

export default NotesList

'use client'

import { useState } from 'react'
import Button from './Button'
import CommentInput from './CommentInput'
import { INote, TCommentStatus } from '@/types'
import { PencilIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/solid'

interface NoteCardProps extends INote {
  onNoteUpdate: (note: string, noteId: string | number) => Promise<void>
  onNoteRemove: (noteId: string | number) => Promise<void>
}

const NoteCard = ({ id, note, lastUpdated, onNoteUpdate, onNoteRemove }: NoteCardProps) => {
  const [commentStatus, setCommentStatus] = useState<TCommentStatus>(note ? 'read' : 'closed')
  const [localNote, setLocalNote] = useState(note)
  const [isSubmitting, setisSubmitting] = useState(false)

  const date = new Date(lastUpdated)

  const handleNoteSave = async (newNote: string) => {
    setLocalNote(newNote)
    setisSubmitting(true)
    await onNoteUpdate(newNote, id)
    setCommentStatus('read')
    setisSubmitting(false)
  }
  const handleNoteRemove = async () => {
    setisSubmitting(true)
    await onNoteRemove(id)
    setisSubmitting(false)
  }

  return (
    <div
      className={`bg-gray-200 flex flex-col gap-4 px-6 py-4 min-h-40 justify-between items-end rounded-md ${isSubmitting && 'opacity-30'}`}
    >
      {commentStatus === 'read' && (
        <div className='w-full h-full flex flex-col  justify-between gap-4'>
          <p>{localNote}</p>
          <div className='flex justify-between items-end gap-4'>
            <span className='text-xs opacity-50'>
              {date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <div className='flex gap-2'>
              <button
                className='bg-white hover:bg-[rgba(255,255,255,.5)] self-end w-8 h-8 grid place-items-center rounded-full disabled:opacity-30'
                onClick={() => setCommentStatus('editing')}
                disabled={isSubmitting}
              >
                <PencilIcon className='w-4 h-4 ' />
              </button>
              <button
                className='bg-white hover:bg-[rgba(255,255,255,.5)] self-end w-8 h-8 grid place-items-center rounded-full disabled:opacity-30'
                onClick={handleNoteRemove}
                disabled={isSubmitting}
              >
                <TrashIcon className='w-4 h-4 text-black' />
              </button>
            </div>
          </div>
        </div>
      )}
      {commentStatus === 'editing' && (
        <CommentInput
          isSubmitting={isSubmitting}
          comment={localNote}
          onSave={handleNoteSave}
          onCancel={() => setCommentStatus(localNote ? 'read' : 'closed')}
          isNote
        />
      )}
    </div>
  )
}

export default NoteCard

'use client'

import { useState } from 'react'
import Button from './Button'
import CommentInput from './CommentInput'

const NoteCard = ({ title, note, isNew = false }: { title: string; note: string; isNew?: boolean }) => {
  const [isActive, setIsActive] = useState(isNew)
  const [localNote, setLocalNote] = useState(note)

  const handleRemoveNote = () => console.log('handleRemoveNote')
  const handleNoteSave = (newNote: string) => {
    setLocalNote(newNote)
    setIsActive(false)
  }

  return (
    <div className='bg-gray-200 flex flex-col gap-4 p-8 items-end rounded-md'>
      {isActive && (
        <CommentInput comment={localNote} onSave={handleNoteSave} onCancel={() => setIsActive(false)} isNote />
      )}
      {!isActive && localNote && (
        <div className='italic'>
          <h3 className='font-bold mb-4'>{title}</h3>
          <p className='text-gray-700 mb-4'>{localNote}</p>
          <div className='flex gap-2'>
            <Button variant='contained' size='md' onClick={() => setIsActive(true)}>
              Edit
            </Button>
            <Button variant='contained-wh' size='md' onClick={handleRemoveNote}>
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NoteCard

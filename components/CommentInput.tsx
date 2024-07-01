'use client'
import Button from '@/components/Button'
import { useState } from 'react'

type CommentInputProps = {
  comment: string
  isSubmitting: boolean
  onSave: (newComment: string) => void
  onCancel: () => void
  isNote?: boolean
}

const CommentInput: React.FC<CommentInputProps> = ({ comment, onSave, onCancel, isSubmitting, isNote = false }) => {
  const [localComment, setLocalComment] = useState(comment)

  const handleSave = () => {
    onSave(localComment)
  }

  return (
    <div
      className={`flex flex-col gap-2 ${isNote ? 'w-full' : 'mt-4 p-4 bg-[rgba(255,255,255,.3)] rounded-md w-[85%]'}`}
    >
      <textarea
        className='p-2 border rounded-md min-h-36 disabled:opacity-75'
        value={localComment}
        onChange={(e) => setLocalComment(e.target.value)}
        disabled={isSubmitting}
      />
      <div className='flex gap-2'>
        <Button variant='contained' size='md' onClick={handleSave} disabled={isSubmitting}>
          Save
        </Button>
        {!isSubmitting && (
          <Button variant='contained-wh' size='md' onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}

export default CommentInput

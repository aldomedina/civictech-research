'use client'

import { InformationCircleIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import CommentInput from './CommentInput'
import classNames from 'classnames'
import Button from '@/components/Button'

const ANSWER_OPTIONS = [
  {
    label: 'does well',
    value: 'well',
  },
  {
    label: 'does ok',
    value: 'ok',
  },
  {
    label: 'does not do',
    value: 'not',
  },
]

const AssessmentCard = ({
  index,
  type,
  assessment,
  description,
  answer,
  comment,
  id, // Necesitamos pasar el id como prop
}: {
  type: string
  assessment: string
  description: string
  answer: string
  comment: string
  id: number | string // Tipo del id
  index: number // Tipo del id
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [localAnswer, setLocalAnswer] = useState(answer)
  const [isCommenting, setIsCommenting] = useState(false)
  const [localComment, setLocalComment] = useState(comment)

  const handleAnswerSubmit = async (newAnswer: string) => {
    setLocalAnswer(newAnswer)
  }

  const handleCommentSave = (newComment: string) => {
    setLocalComment(newComment)
    setIsCommenting(false)
  }

  const wrapperStyle = classNames('flex flex-col gap-4 p-4 items-end  rounded-md', {
    'bg-cielo': type == 'before',
    'bg-lima': type == 'after',
    'bg-lila': type == 'during',
  })

  return (
    <div className={wrapperStyle}>
      <div className='flex justify-between items-start w-full'>
        <h3 className=''>{`${index + 1}. ${assessment}`}</h3>
        <button onClick={() => setIsOpen(!isOpen)}>
          <InformationCircleIcon className={`mt-1 h-6 w-6 overflow-hidden rounded-full ${isOpen && 'bg-white'}`} />
        </button>
      </div>
      {isOpen && <div className='text-gray-700 max-w-md self-start ml-6'>{description}</div>}
      <div className='flex justify-between items-end mt-4 w-full'>
        <div className='flex flex-col gap-2'>
          {ANSWER_OPTIONS.map((el) => (
            <button
              key={assessment + el.value}
              onClick={() => handleAnswerSubmit(el.value)}
              className={`text-left text-sm px-4 py-2 rounded-md border border-white uppercase font-mono ${
                localAnswer === el.value ? 'bg-[rgba(255,255,255,.5)] text-black' : ' text-black'
              }`}
            >
              {el.label}
            </button>
          ))}
        </div>
        {!comment && (
          <Button variant='contained-wh' size='md' onClick={() => setIsCommenting(true)}>
            + Comment
          </Button>
        )}
      </div>
      {isCommenting && (
        <CommentInput comment={localComment} onSave={handleCommentSave} onCancel={() => setIsCommenting(false)} />
      )}
      {!isCommenting && localComment && (
        <div className='italic mt-4 p-4 bg-[rgba(255,255,255,.5)] rounded-md w-[85%]'>
          <p className='text-gray-700 mb-4'>{localComment}</p>
          <div className='flex gap-2'>
            <Button variant='contained-wh' size='md' onClick={() => setIsCommenting(true)}>
              Edit
            </Button>
            <Button variant='contained-wh' size='md' onClick={() => setLocalComment('')}>
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssessmentCard

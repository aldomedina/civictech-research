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

type TCommentStatus = 'closed' | 'read' | 'editing'

const AssessmentCard = ({
  index,
  type,
  assessment,
  description,
  answer,
  comment,
  id,
  onAnswerSubmit,
  onCommentSubmit,
}: {
  id: number | string
  type: string
  assessment: string
  description: string
  answer?: string
  comment?: string
  index: number
  onAnswerSubmit: (assessmentId: number | string, answer: string) => Promise<void>
  onCommentSubmit: (assessmentId: number | string, comment: string) => Promise<void>
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [localAnswer, setLocalAnswer] = useState(answer)
  const [commentStatus, setCommentStatus] = useState<TCommentStatus>(comment ? 'read' : 'closed')
  const [localComment, setLocalComment] = useState(comment)
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false)
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)

  const handleAnswerSubmit = async (newAnswer: string) => {
    setIsSubmittingAnswer(true)
    setLocalAnswer(newAnswer)
    await onAnswerSubmit(id, newAnswer)
    setIsSubmittingAnswer(false)
  }

  const handleCommentSave = async (newComment: string) => {
    setLocalComment(newComment)
    setIsSubmittingComment(true)
    await onCommentSubmit(id, newComment)
    setIsSubmittingComment(false)
    setCommentStatus(newComment ? 'read' : 'closed')
  }

  const wrapperStyle = classNames('flex flex-col gap-4 p-4 items-end rounded-md', {
    'bg-cielo': type === 'before',
    'bg-lima': type === 'after',
    'bg-lila': type === 'during',
  })

  return (
    <div className={wrapperStyle}>
      <div className='flex justify-between items-start w-full'>
        <h3>{`${index + 1}. ${assessment}`}</h3>
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
                localAnswer === el.value ? 'bg-[rgba(255,255,255,.5)] text-black' : 'text-black'
              } disabled:opacity-50`}
              disabled={isSubmittingAnswer}
            >
              {el.label}
            </button>
          ))}
        </div>
        {commentStatus == 'closed' && (
          <Button variant='contained-wh' size='md' onClick={() => setCommentStatus('editing')}>
            + Comment
          </Button>
        )}
      </div>

      {commentStatus == 'editing' && (
        <CommentInput
          comment={localComment || ''}
          onSave={handleCommentSave}
          onCancel={() => setCommentStatus(localComment ? 'read' : 'closed')}
          isSubmitting={isSubmittingComment}
        />
      )}
      {commentStatus == 'read' && (
        <div className='italic mt-4 p-4 bg-[rgba(255,255,255,.5)] rounded-md w-[85%]'>
          <p className='text-gray-700 mb-4'>{localComment}</p>
          <div className='flex gap-2'>
            <Button variant='contained-wh' size='md' onClick={() => setCommentStatus('editing')}>
              Edit
            </Button>
            {/* <Button variant='contained-wh' size='md' onClick={() => setLocalComment('')}>
              Remove
            </Button> */}
          </div>
        </div>
      )}
    </div>
  )
}

export default AssessmentCard

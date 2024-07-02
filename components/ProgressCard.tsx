// components/ProgressCard.tsx

import React from 'react'
import classNames from 'classnames'
import ActivityButton from './ActivityButton'
import Link from 'next/link'
import { TAssessmentType } from '@/types'

interface ProgressCardProps {
  href: string
  type: TAssessmentType
  children: React.ReactNode
  platformName: string
}

const ProgressCard: React.FC<ProgressCardProps> = ({ href, type, children, platformName }) => {
  const bgColor = classNames({
    'bg-cielo': type === 'before',
    'bg-lila': type === 'during',
    'bg-lima': type === 'after',
    'bg-gray-200': type === 'notes',
  })

  const subtitle = (type: TAssessmentType) =>
    ({
      notes: (
        <>
          general notes about <strong className='capitalize'>{platformName}</strong>
        </>
      ),
      after: 'the process',
      during: 'the process',
      before: 'the process',
    })[type]

  return (
    <Link href={href}>
      <div
        className={`flex items-end justify-between p-4 rounded-lg transition duration-300 hover:shadow-md hover:opacity-85  ${bgColor}`}
      >
        <div className='flex flex-col justify-between min-h-28'>
          <div className='leading-5'>
            <h2 className='font-bold capitalize text-lg'>{type}</h2>
            <h3 className='opacity-50 text-sm'>{subtitle(type)}</h3>
          </div>
          <ActivityButton style='white-chevron' />
        </div>
        {children}
      </div>
    </Link>
  )
}

export default ProgressCard

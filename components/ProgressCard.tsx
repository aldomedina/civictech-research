// components/ProgressCard.tsx

import React from 'react'
import classNames from 'classnames'
import ActivityButton from './ActivityButton'
import Link from 'next/link'

interface ProgressCardProps {
  href: string
  type: 'before' | 'during' | 'after'
  count: number
  total: number
}

const ProgressCard: React.FC<ProgressCardProps> = ({ href, type, count, total }) => {
  const bgColor = classNames({
    'bg-cielo': type === 'before',
    'bg-lila': type === 'during',
    'bg-lima': type === 'after',
  })

  return (
    <Link href={href}>
      <div
        className={`flex items-center justify-between p-4 rounded-lg transition duration-300 hover:shadow-md hover:opacity-85  ${bgColor}`}
      >
        <div className='flex flex-col justify-between min-h-28'>
          <div className='leading-5'>
            <h2 className='font-bold capitalize text-lg'>{type}</h2>
            <h3 className='opacity-50 text-sm'>the process</h3>
          </div>
          <ActivityButton style='white-chevron' />
        </div>
        <div className='text-6xl self-end'>
          {count}
          <span className='text-sm opacity-50'> / {total}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProgressCard

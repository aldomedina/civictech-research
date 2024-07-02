'use client'

import Button from '@/components/Button'
import { useRouter } from 'next/navigation'

const BottomCTA = ({
  text,
  onClick,
  disabled = false,
}: {
  text: string
  disabled?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <div className='sticky bottom-0 w-full py-4 bg-white'>
      <Button size='xl' fullWidth variant='contained' onClick={onClick} disabled={disabled}>
        {text}
      </Button>
    </div>
  )
}

export default BottomCTA

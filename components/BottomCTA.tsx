'use client'

import Button from '@/components/Button'
import { useRouter } from 'next/navigation'

const BottomCTA = ({ text, onClick }: { text: string; onClick: React.MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <div className='sticky bottom-0 w-full py-4 bg-white'>
      <Button size='xl' fullWidth variant='contained' onClick={onClick}>
        {text}
      </Button>
    </div>
  )
}

export default BottomCTA

'use client'

import Button from '@/components/Button'
import { useRouter } from 'next/navigation'

const BottomButton = ({ platform }: { platform: string }) => {
  const router = useRouter()
  return (
    <div className='sticky bottom-0 w-full py-4 bg-white'>
      <Button size='xl' fullWidth variant='contained' onClick={() => router.push(`/platform/${platform}`)}>
        CONTINUE
      </Button>
    </div>
  )
}

export default BottomButton

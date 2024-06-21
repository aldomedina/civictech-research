'use client'

import { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import { useAuthStore } from '@/stores/auth'

const UserBox = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const user = useAuthStore((state) => state.user)
  const clearUser = useAuthStore((state) => state.clearUser)

  const handleSignOut = async () => {
    await signOut()
    clearUser()
  }

  return (
    <>
      <div className='text-xs text-right cursor-pointer' onClick={() => setModalOpen(true)}>
        <span className='opacity-50 font-extralight'>logged as:</span>
        <br />
        <span className='opacity-70 hover:opacity-100 font-medium'>{user?.name || 'User'}</span>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        cta={
          <Button variant='contained' size='md' fullWidth onClick={handleSignOut}>
            SIGN OUT
          </Button>
        }
      >
        <div className='flex flex-col gap-6 items-center mb-6'>
          <UserCircleIcon className='w-20 h-20' />
          <p>Do you want to sign out?</p>
        </div>
      </Modal>
    </>
  )
}

export default UserBox

'use client'

import { useState } from 'react'
import Modal from './Modal'
import Button from './Button'
import { UserCircleIcon } from '@heroicons/react/24/outline'

const UserBox = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)
  const signOut = () => console.log('signed out')
  return (
    <>
      <div className='text-xs text-right cursor-pointer' onClick={openModal}>
        <span className='opacity-50 font-extralight'>logged as:</span>
        <br />
        <span className='opacity-70 hover:opacity-100 font-medium'>Aldo Medina</span>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        cta={
          <Button variant='contained' size='md' fullWidth onClick={signOut}>
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

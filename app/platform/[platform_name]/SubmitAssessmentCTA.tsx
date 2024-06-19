'use client'
import BottomCTA from '@/components/BottomCTA'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { PaperAirplaneIcon } from '@heroicons/react/16/solid'

import { useState } from 'react'

const SubmitAssessmentCTA = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)
  const handleSubmit = () => console.log('signed out')
  return (
    <>
      <BottomCTA text='SUBMIT ASSESSMENT' onClick={openModal} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        closeCTAMessage='CANCEL'
        cta={
          <Button variant='contained' size='md' fullWidth onClick={handleSubmit}>
            CONFIRM
          </Button>
        }
      >
        <div className='flex flex-col gap-6 items-center mb-6'>
          <PaperAirplaneIcon className='w-20 h-20 text-success' />
          <p>Are you sure you want to submit the survey</p>
        </div>
      </Modal>
    </>
  )
}

export default SubmitAssessmentCTA

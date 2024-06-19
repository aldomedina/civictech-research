'use client'

import Button from './Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children?: React.ReactNode
  cta?: React.ReactNode
  closeCTAMessage?: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, cta, closeCTAMessage }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose}></div>
      <div className='bg-white rounded-lg shadow-lg p-6 z-50 w-11/12 md:w-1/2 lg:w-1/3'>
        {title && <h2 className='text-xl font-semibold mb-4'>{title}</h2>}
        {children}
        <div className='flex gap-4'>
          {cta}
          <Button variant='outlined' size='md' fullWidth onClick={onClose}>
            {closeCTAMessage ?? 'Close'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal

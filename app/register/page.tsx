import React from 'react'
import RegisterForm from './RegisterForm'

const RegisterPage = () => {
  return (
    <main className='flex min-h-screen items-center font-sans justify-center'>
      <div className='absolute top-0 w-full flex'>
        <div className='h-3 bg-cielo flex-1' />
        <div className='h-3 bg-lila flex-1' />
        <div className='h-3 bg-lima flex-1' />
      </div>

      <div className='max-w-xs w-full'>
        <div className='mb-12 text-center'>
          <h1 className='font-bold text-2xl'>Welcome</h1>
          <h4 className='text-gray-500'>please, sign up</h4>
        </div>
        <RegisterForm />
      </div>
    </main>
  )
}

export default RegisterPage

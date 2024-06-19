// components/SignInForm.tsx

'use client'

import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Button from './Button'
import TextInput from './TextInput'

// Validación del esquema con Yup
const validationSchema = Yup.object({
  user: Yup.string().required('User is required'),
  password: Yup.string().required('Password is required'),
})

const SignInForm: React.FC = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-sm'>
        <div className='mb-12 text-center'>
          <h1 className='font-bold text-2xl'>Welcome</h1>
          <h4 className='text-gray-500'>please, sign in</h4>
        </div>
        <Formik
          initialValues={{ user: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput id='user' name='user' label='User' type='text' className='mb-4' />
              <TextInput id='password' name='password' label='Password' type='password' className='mb-16' />
              <Button
                type='submit'
                size='xl'
                variant='contained'
                className='bg-black text-white w-full'
                disabled={isSubmitting}
              >
                SUBMIT SURVEY
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SignInForm

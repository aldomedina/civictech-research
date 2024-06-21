'use client'
import Button from '@/components/Button'
import TextInput from '@/components/TextInput'
import { Form, Formik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const validationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

const SignInForm = () => {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>, submitForm: () => void) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submitForm()
    }
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={toFormikValidationSchema(validationSchema)}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        setError(null)
        try {
          signIn('credentials', { ...values, redirect: false })
          router.push('/platform')
          router.refresh()
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message)
          }
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, submitForm }) => (
        <Form className='w-full' onKeyDown={(event) => handleKeyDown(event, submitForm)}>
          <TextInput id='email' name='email' label='Email' type='text' className='mb-4' disabled={isSubmitting} />
          <TextInput
            id='password'
            name='password'
            label='Password'
            type='password'
            className='mb-16'
            disabled={isSubmitting}
          />
          {error && <div className='text-red-500 mb-4'>{error}</div>}
          <Button fullWidth type='submit' size='xl' variant='contained' disabled={isSubmitting}>
            {isSubmitting ? 'LOADING...' : 'LOGIN'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignInForm

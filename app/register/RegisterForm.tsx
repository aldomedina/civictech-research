'use client'
import Button from '@/components/Button'
import TextInput from '@/components/TextInput'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const validationSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
  })
  .superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords must match',
        path: ['confirmPassword'],
      })
    }
  })

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null)

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={toFormikValidationSchema(validationSchema)}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        setError(null)
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error.map((err: { message: string }) => err.message).join(', '))
          }

          const data = await response.json()
          console.log({ data })
          resetForm() // Reset the form after successful submission
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message)
          }
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className='w-full'>
          <TextInput id='name' name='name' label='Name' type='text' className='mb-4 w-full' disabled={isSubmitting} />
          <TextInput id='email' name='email' label='Email' type='text' className='mb-4' disabled={isSubmitting} />
          <TextInput
            id='password'
            name='password'
            label='Password'
            type='password'
            className='mb-4'
            disabled={isSubmitting}
          />
          <TextInput
            id='confirm-password'
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            className='mb-16'
            disabled={isSubmitting}
          />
          {error && <div className='text-red-500 mb-4'>{error}</div>}
          <Button fullWidth type='submit' size='xl' variant='contained' disabled={isSubmitting}>
            {isSubmitting ? 'LOADING...' : 'CREATE USER'}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm

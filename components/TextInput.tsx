// components/TextInput.tsx

import React from 'react'
import { Field, ErrorMessage } from 'formik'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  name: string
}

const TextInput: React.FC<TextInputProps> = ({ id, label, name, className, ...props }) => {
  return (
    <div className={className}>
      <label htmlFor={id} className='block text-sm text-gray-700'>
        {label}
      </label>
      <Field
        id={id}
        name={name}
        {...props}
        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-75'
      />
      <ErrorMessage name={name} component='div' className='text-red-500 text-sm mt-1' />
    </div>
  )
}

export default TextInput

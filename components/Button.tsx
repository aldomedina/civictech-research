// components/Button.tsx

import React from 'react'
import classNames from 'classnames'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'sm' | 'md' | 'xl'
  variant: 'contained' | 'outlined' | 'outlined-wh' | 'contained-wh'
  fullWidth?: boolean
}

const Button: React.FC<ButtonProps> = ({ size, variant, className, children, fullWidth, ...props }) => {
  const baseStyles =
    'font-mono transition duration-300 hover:shadow-lg  rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2'

  const sizeStyles = classNames({
    'px-1 py-[2px] text-xs rounded-full': size === 'sm',
    'px-4 py-2 text-sm rounded-md': size === 'md',
    'px-6 py-3 text-xl rounded-full': size === 'xl',
  })

  const variantStyles = classNames({
    'bg-black text-white hover:bg-gray-900 ': variant === 'contained',
    'border border-black text-black ': variant === 'outlined',
    'border border-white text-black ': variant === 'outlined-wh',
    'bg-white text-black  rounded-lg': variant === 'contained-wh',
  })

  const combinedStyles = `${baseStyles} ${sizeStyles} ${variantStyles} ${fullWidth ? 'w-full' : 'max-w-max'} ${className}`

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  )
}

export default Button

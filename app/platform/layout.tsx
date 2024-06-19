import Breadcrumbs from '@/components/Breadcrumbs'
import UserBox from '@/components/UserBox'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen font-sans flex flex-col'>
      <header className='px-4'>
        <div className='py-2 max-w-3xl mx-auto w-full flex justify-between  border-b border-cielo'>
          <Breadcrumbs />
          <UserBox />
        </div>
      </header>

      <main className='flex-grow p-4  max-w-3xl mx-auto w-full'>{children}</main>
    </div>
  )
}

export default Layout

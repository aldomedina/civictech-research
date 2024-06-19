'use client'

import { useRouter } from 'next/navigation'
import Button from './Button'

interface MenuItem {
  value: string
  label: string
}

const PlatformHeader = ({
  title,
  subtitle,
  mainMenu,
  active,
}: {
  active: string
  title: string
  subtitle: string | React.ReactNode
  mainMenu?: MenuItem[]
}) => {
  const router = useRouter()
  return (
    <div className='min-h-32 flex'>
      <div className='basis-2/3'>
        <h1 className='text-2xl font-semibold uppercase'>{title}</h1>
        <h2 className='text-base opacity-50'>{subtitle}</h2>
      </div>
      {mainMenu && (
        <div className='basis-1/3 flex flex-col items-end gap-2'>
          {mainMenu.map((el) => (
            <Button
              onClick={() => router.push(`/platform/${active}` + el.value)}
              key={'menuItem' + el.value}
              size='sm'
              variant='outlined'
            >
              {el.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlatformHeader

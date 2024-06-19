'use client'

import PlatformCard from '@/components/PlatformCard'
import React from 'react'

type Platform = {
  name: string
  status: boolean
}

type ClientPlatformListProps = {
  platforms: Platform[]
}

const ClientPlatformList: React.FC<ClientPlatformListProps> = ({ platforms }) => {
  return (
    <ul className='flex flex-col md:grid gap-4 md:grid-cols-2 md:grid-rows-2'>
      {platforms.map((platform) => (
        <PlatformCard key={platform.name} title={platform.name} state={platform.status} />
      ))}
    </ul>
  )
}

export default ClientPlatformList

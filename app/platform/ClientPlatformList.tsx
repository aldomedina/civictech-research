'use client'

import React, { useEffect, useState } from 'react'
import PlatformCard from '@/components/PlatformCard'
import { getBaseUrl } from '@/utils/getBaseUrl'

type Platform = {
  id: string
  name: string
  slug: string
  status: boolean
}

const ClientPlatformList: React.FC = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const response = await fetch(`/api/platforms`)
        if (response.ok) {
          const data = await response.json()
          console.log({ data })
          setPlatforms(data)
        }
      } catch (error) {
        console.error('Error fetching platforms:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPlatforms()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <ul className='flex flex-col md:grid gap-4 md:grid-cols-2 md:grid-rows-2'>
      {platforms.map((platform) => (
        <PlatformCard key={platform.id} title={platform.name} state={platform.status} slug={platform.slug} />
      ))}
    </ul>
  )
}

export default ClientPlatformList

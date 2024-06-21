'use client'

import React, { useEffect, useState } from 'react'
import PlatformCard from '@/components/PlatformCard'
import { getBaseUrl } from '@/utils/getBaseUrl'
import ProgressCard from '@/components/ProgressCard'

type AssessmentCount = {
  type: 'during' | 'after' | 'before'
  total: number
  count: number
}

const AssessmentsCardList = ({ slug }: { slug: string }) => {
  const [data, setData] = useState<AssessmentCount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const response = await fetch(`/api/platforms/${slug}`)
        if (response.ok) {
          const data = await response.json()
          console.log({ data })
          setData(data)
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
    <>
      {data.map((item) => (
        <ProgressCard
          key={item.type}
          type={item.type}
          count={item.count}
          total={item.total}
          href={`/platform/${slug}/assessment/${item.type}`}
        />
      ))}
    </>
  )
}

export default AssessmentsCardList

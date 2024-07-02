'use client'

import React, { useEffect, useState } from 'react'
import PlatformCard from '@/components/PlatformCard'
import { getBaseUrl } from '@/utils/getBaseUrl'
import ProgressCard from '@/components/ProgressCard'
import { TAssessmentType } from '@/types'
import Spinner from '@/components/Spinner'

type AssessmentCount = {
  type: TAssessmentType
  total: number
  count: number
}

const types: TAssessmentType[] = ['before', 'during', 'after', 'notes']

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

  const getCounter = (type: TAssessmentType) => {
    let el = (data as AssessmentCount[]).find((el) => el.type == type)
    if (!el) return null
    return (
      <div className='self-end'>
        <span className='text-6xl'>{el.count}</span>
        {el.total && <span className='text-sm opacity-50'> / {el.total}</span>}
      </div>
    )
  }

  return (
    <>
      {types.map((type) => {
        const href = type == 'notes' ? `/platform/${slug}/notes` : `/platform/${slug}/assessment/${type}`
        return (
          <ProgressCard key={type} type={type} href={href} platformName={slug}>
            {loading ? <Spinner /> : getCounter(type)}
          </ProgressCard>
        )
      })}
    </>
  )
}

export default AssessmentsCardList

// AssessmentList.tsx
'use client'
import AssessmentCard from '@/components/AssessmentCard'
import { useEffect, useState } from 'react'

interface IAssessment {
  type: string
  id: number | string
  assessment: string
  description: string
  answer: string
  comment: string
}

const AssessmentsList = ({ platform, assessmentType }: { platform: string; assessmentType: string }) => {
  const [data, setData] = useState<IAssessment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlatforms() {
      try {
        const response = await fetch(`/api/platforms/${platform}/assessment/${assessmentType}`)
        if (response.ok) {
          const data = await response.json()
          setData(data)
        }
      } catch (error) {
        console.error('Error fetching platforms:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPlatforms()
  }, [platform, assessmentType])

  if (loading) {
    return <p>Loading...</p>
  }

  const handleAnswerSubmit = async (assessmentId: number | string, answer: string) => {
    try {
      const response = await fetch(`/api/platforms/${platform}/assessment/${assessmentType}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assessment_id: assessmentId, answer }),
      })
      if (response.ok) {
        const data = await response.json()
        setData(data)
        return
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      return
    }
  }

  const handleCommentSubmit = async (assessment_id: number | string, comment: string) => {
    try {
      const response = await fetch(`/api/platforms/${platform}/assessment/${assessmentType}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ assessment_id, comment }),
      })
      if (response.ok) {
        const data = await response.json()
        setData(data)
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      {data.map((el, i) => (
        <AssessmentCard
          key={el.id}
          {...el}
          index={i}
          onAnswerSubmit={handleAnswerSubmit}
          onCommentSubmit={handleCommentSubmit}
        />
      ))}
    </div>
  )
}

export default AssessmentsList

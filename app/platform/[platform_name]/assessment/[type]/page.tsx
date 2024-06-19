import { notFound } from 'next/navigation'
import AssessmentCard from '@/components/AssessmentCard'
import Button from '@/components/Button'
import PlatformHeader from '@/components/PlatformHeader'

const AssessmentPage = async ({ params }: { params: { platform_name: string; type: string } }) => {
  const { platform_name, type } = params
  const url = `http://localhost:3000/api/platforms/${platform_name}/assessment/${type}`
  const response = await fetch(url)

  if (!response.ok) {
    notFound()
    return null
  }

  const { data } = await response.json()

  return (
    <>
      <PlatformHeader
        active={platform_name}
        title={type}
        subtitle='the process'
        mainMenu={[{ value: '/', label: 'GO BACK' }]}
      />

      <div className='flex flex-col gap-4'>
        {(
          data as {
            type: string
            id: number | string
            assessment: string
            description: string
            answer: string
            comment: string
          }[]
        ).map((el, i) => (
          <AssessmentCard key={el.id} {...el} index={i} />
        ))}
      </div>
    </>
  )
}

export default AssessmentPage

import PlatformHeader from '@/components/PlatformHeader'
import AssessmentsList from './AssessmentsList'
import { notFound } from 'next/navigation'

const AssessmentPage = async ({ params }: { params: { platform_name: string; assessment_type: string } }) => {
  const { platform_name, assessment_type } = params

  if (!['before', 'after', 'during'].includes(assessment_type)) {
    notFound()
  }

  return (
    <>
      <PlatformHeader
        active={platform_name}
        title={assessment_type}
        subtitle='the process'
        mainMenu={[{ value: '/', label: 'GO BACK' }]}
      />
      <AssessmentsList platform={platform_name} assessmentType={assessment_type} />
    </>
  )
}

export default AssessmentPage

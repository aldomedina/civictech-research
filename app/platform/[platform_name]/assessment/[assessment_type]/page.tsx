import { notFound } from 'next/navigation'
import AssessmentCard from '@/components/AssessmentCard'
import Button from '@/components/Button'
import PlatformHeader from '@/components/PlatformHeader'
import { getBaseUrl } from '@/utils/getBaseUrl'
import AssessmentsList from './AssessmentsList'

const AssessmentPage = async ({ params }: { params: { platform_name: string; assessment_type: string } }) => {
  const { platform_name, assessment_type } = params

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

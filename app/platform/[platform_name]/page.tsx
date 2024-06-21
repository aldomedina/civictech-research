import { notFound } from 'next/navigation'
import ActivityButton from '@/components/ActivityButton'
import ProgressCard from '@/components/ProgressCard'
import PlatformHeader from '@/components/PlatformHeader'
import SubmitAssessmentCTA from './SubmitAssessmentCTA'
import Link from 'next/link'
import { getBaseUrl } from '@/utils/getBaseUrl'
import AssessmentsCardList from './AssessmentsCardList'

interface IAssessment {
  name: string
  type: 'before' | 'during' | 'after'
  count: number
  total: number
}

const PlatformPage = async ({ params }: { params: { platform_name: string } }) => {
  const platform_name = params.platform_name

  return (
    <div>
      <PlatformHeader
        active={platform_name}
        title={platform_name}
        subtitle='assessment'
        mainMenu={[
          { value: '/scenario', label: 'SCENARIO' },
          { value: '/instructions', label: 'INSTRUCTIONS' },
        ]}
      />

      <div className='flex flex-col mb-6 md:grid gap-4 md:grid-cols-2 md:grid-rows-2'>
        <AssessmentsCardList slug={platform_name} />
        <Link href={`/platform/${platform_name}/notes`}>
          <div className='flex items-center justify-between rounded-lg bg-gray-200 p-4 transition duration-300 hover:shadow-md hover:opacity-85  '>
            <div className='flex flex-col justify-between min-h-28'>
              <div className='leading-5'>
                <h2 className='font-bold capitalize text-lg'>Notes</h2>
                <h3 className='opacity-50 text-sm'>
                  general notes about <strong className='capitalize'>{platform_name}</strong>
                </h3>
              </div>
              <ActivityButton style='black-chevron' />
            </div>
            <div className='text-6xl self-end'>{0}</div>
          </div>
        </Link>
      </div>
      <SubmitAssessmentCTA />
    </div>
  )
}

export default PlatformPage

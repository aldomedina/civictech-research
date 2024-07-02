import PlatformHeader from '@/components/PlatformHeader'
import AssessmentsCardList from './AssessmentsCardList'

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
        {/* <ProgressCard platformName={platform_name} type='notes' href={`/platform/${platform_name}/notes`}>
          <div className='text-6xl self-end'>{0}</div>
        </ProgressCard> */}
      </div>
      {/* <SubmitAssessmentCTA /> */}
    </div>
  )
}

export default PlatformPage

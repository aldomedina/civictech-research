import { notFound } from 'next/navigation'

import PlatformHeader from '@/components/PlatformHeader'
import BottomCTA from './BottomCTA'
import { getDescription } from '@/lib/data'
import { TPlatform } from '@/types'

const PlatformScenario = async ({ params }: { params: { platform_name: string } }) => {
  if (!['loomio', 'decidim', 'considerit', 'polis'].includes(params.platform_name)) {
    notFound()
  }
  return (
    <>
      <PlatformHeader active={params.platform_name} title={params.platform_name} subtitle={'instructions'} />

      <div className='max-w-xl flex flex-col gap-6 mb-12'>
        <p>
          For this activity, we will explain to you a use scenario and we will collect your feedback of how well did you
          thought the tool supported you.
        </p>
        <ol className='list-decimal px-6'>
          <li>
            Read the use case <mark className='bg-lima'>scenario</mark>.
          </li>
          <li>
            Read the best practice <mark className='bg-lima'>guideline</mark>.
          </li>
          <li>
            <mark className='bg-lima'>Assess</mark> the tool.
          </li>
        </ol>
        <p>{getDescription(params.platform_name as TPlatform)}</p>
      </div>
      <BottomCTA platform={params.platform_name} />
    </>
  )
}

export default PlatformScenario

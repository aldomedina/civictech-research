import PlatformHeader from '@/components/PlatformHeader'
import BottomCTA from './BottomCTA'
import { getScenario } from '@/lib/data'
import { notFound } from 'next/navigation'
import { TPlatform } from '@/types'

const PlatformScenario = async ({ params }: { params: { platform_name: string } }) => {
  if (!['loomio', 'decidim', 'considerit', 'polis'].includes(params.platform_name)) {
    notFound()
  }
  return (
    <>
      <PlatformHeader active={params.platform_name} title={params.platform_name} subtitle='case scenario' />

      <div className='max-w-xl flex flex-col gap-6 mb-12 mx-auto'>
        {getScenario(params.platform_name as TPlatform).map((el) => (
          <p key={el}>{el}</p>
        ))}
      </div>
      <BottomCTA platform={params.platform_name} />
    </>
  )
}

export default PlatformScenario

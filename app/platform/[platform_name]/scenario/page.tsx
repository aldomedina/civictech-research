import PlatformHeader from '@/components/PlatformHeader'
import BottomCTA from './BottomCTA'

const PlatformScenario = async ({ params }: { params: { platform_name: string } }) => {
  return (
    <>
      <PlatformHeader active={params.platform_name} title={params.platform_name} subtitle='case scenario' />

      <div className='max-w-xl flex flex-col gap-6 mb-12 mx-auto'>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, esse? Dolores accusantium esse quod
          pariatur sunt, consectetur asperiores necessitatibus obcaecati repudiandae soluta ipsa error incidunt? Quasi
          cupiditate voluptatibus corporis minus.
        </p>
        <p>
          Porro dolores consectetur neque exercitationem nam fugiat hic quos ab obcaecati similique. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. A, placeat laudantium. Culpa et nam, maxime maiores perspiciatis
          deleniti nostrum sequi.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, esse? Dolores accusantium esse quod
          pariatur sunt, consectetur asperiores necessitatibus obcaecati repudiandae soluta ipsa error incidunt? Quasi
          cupiditate voluptatibus corporis minus.
        </p>
      </div>
      <BottomCTA platform={params.platform_name} />
    </>
  )
}

export default PlatformScenario

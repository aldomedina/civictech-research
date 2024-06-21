import ClientPlatformList from './ClientPlatformList'

const PlatformPage = async () => {
  return (
    <div>
      <div className='min-h-32'>
        <h1 className='text-2xl font-bold'>Select the platform</h1>
        <h2 className='text-base opacity-50 lowercase'>You want to evaluate</h2>
      </div>
      <ClientPlatformList />
    </div>
  )
}

export default PlatformPage

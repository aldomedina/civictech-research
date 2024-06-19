// app/platform/page.tsx

import ClientPlatformList from './ClientPlatformList'

async function fetchPlatforms() {
  const response = await fetch('http://localhost:3000/api/platforms')
  if (response.ok) {
    return response.json()
  }
  return []
}

const PlatformPage = async () => {
  const platforms = await fetchPlatforms()

  return (
    <div>
      <div className='min-h-32'>
        <h1 className='text-2xl font-bold'>Select the platform</h1>
        <h2 className='text-base opacity-50 lowercase'>You want to evaluate</h2>
      </div>
      <ClientPlatformList platforms={platforms} />
    </div>
  )
}

export default PlatformPage

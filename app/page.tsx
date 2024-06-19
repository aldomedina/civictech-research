import SignInForm from '@/components/SignInForm'

export default function Home() {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='absolute top-0 w-full flex'>
        <div className='h-3 bg-cielo flex-1' />
        <div className='h-3 bg-lila flex-1' />
        <div className='h-3 bg-lima flex-1' />
      </div>
      <SignInForm />
      {process.env.NEXT_PUBLIC_VERCEL_URL || 'NEXT_PUBLIC_VERCEL_URL not working'}
    </main>
  )
}

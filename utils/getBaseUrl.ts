export function getBaseUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  } else {
    return process.env.NEXT_PUBLIC_VERCEL_URL || 'https://your-production-url.vercel.app'
  }
}

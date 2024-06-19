export function getBaseUrl(): string {
  let baseUrl: string = ''

  if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000'
  } else {
    let domain = process.env.NEXT_PUBLIC_VERCEL_URL || ''
    baseUrl = `https://${domain}`
  }

  return baseUrl
}

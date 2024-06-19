export function getBaseUrl(): string {
  let baseUrl: string = ''

  if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000'
  } else {
    baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL || ''
    if (baseUrl && !/^https?:\/\//i.test(baseUrl)) {
      baseUrl = `https://${baseUrl}`
    }
  }

  return baseUrl
}

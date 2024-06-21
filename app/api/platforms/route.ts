// /app/api/platforms/route.ts
import platforms_placeholder from '@/placeholders/platforms'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json(platforms_placeholder)
}

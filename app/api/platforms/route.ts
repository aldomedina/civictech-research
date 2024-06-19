import { NextRequest, NextResponse } from 'next/server'

import platforms_placeholder from '@/placeholders/platforms'
export async function GET(request: NextRequest) {
  return NextResponse.json(platforms_placeholder)
}

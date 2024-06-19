// app/api/platforms/[platform_name]/route.ts

import platforms_placeholder from '@/placeholders/platforms'
import { NextRequest, NextResponse } from 'next/server'

// Dummy data for platforms. In a real application, this would come from a database.

export async function GET(request: Request, { params }: { params: { platform_name: string } }) {
  const { platform_name } = params
  const platformData = platforms_placeholder.find((p) => p.name.toLowerCase() === platform_name.toLowerCase())
  if (platformData) {
    return NextResponse.json(platformData)
  } else {
    return NextResponse.json({ message: 'Platform not found' }, { status: 404 })
  }
}

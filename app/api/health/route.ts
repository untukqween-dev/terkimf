import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { status: 'ok', mode: 'standalone', timestamp: new Date().toISOString() },
        { status: 200 }
      );
    }

    const res = await fetch(`${backendUrl}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { status: 'backend_unavailable', error: 'Backend server is offline', timestamp: new Date().toISOString() },
      { status: 503 }
    );
  }
}
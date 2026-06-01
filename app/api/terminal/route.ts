import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

export async function GET(request: Request) {
  if (!BACKEND_URL) {
    return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
  }

  try {
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/terminal', '');

    const res = await fetch(`${BACKEND_URL}/api/terminal${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Terminal service unavailable' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!BACKEND_URL) {
    return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/terminal', '');

    const res = await fetch(`${BACKEND_URL}/api/terminal${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Terminal service unavailable' }, { status: 503 });
  }
}
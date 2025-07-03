import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  return NextResponse.json({ id: params.id });
}

import { getVideoById } from '@/lib/getVideoById';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const video = await getVideoById(params.id);

    if (!video) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
    const response = NextResponse.json(video);
    response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');

    return response;
}


import { getVideoById } from '@/lib/getVideoById';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    const video = await getVideoById(id);

    if (!video) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const response = NextResponse.json(video);
    response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
    return response;
}

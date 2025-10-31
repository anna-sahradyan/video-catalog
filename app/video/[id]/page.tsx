'use server';

import { getVideoById } from '@/lib/getVideoById';
import { VideoDetail } from '@/components/VideoDetail';


export default async function VideoDetailPage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await Promise.resolve(params);
    const { id } = resolvedParams;

    if (!id) {
        return <div className='max-w-4xl mx-auto p-4'>Не указан ID видео</div>;
    }

    const video = await getVideoById(id);

    if (!video) {
        return <div className='max-w-4xl mx-auto p-4'>Видео не найдено</div>;
    }

    return (
        <div className='max-w-4xl mx-auto mt-[130px]'>
                <VideoDetail video={video} />

        </div>
    );
}


import { getVideos } from '@/lib/getVideos';
import { VideoCatalog } from '@/components/VideoCatalog';
import { TVideo } from '@/types/video';
import { Suspense } from 'react';
import Loading from '@/app/loading';

export default async function Page() {
    const videos: TVideo[] = await getVideos();

    return (
        <Suspense fallback={<Loading />}>
            <VideoCatalog videos={videos} />
        </Suspense>
    );
}

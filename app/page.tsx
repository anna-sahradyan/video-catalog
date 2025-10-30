import { getVideos } from '@/lib/getVideos';
import { VideoCatalog } from '@/components/VideoCatalog';
import { TVideo } from '@/types/video';

export default async function Page() {
    const videos: TVideo[] = await getVideos();

    return <VideoCatalog videos={videos} />;
}

import { TVideo } from '@/types/video';
import fs from 'fs/promises';
import path from 'path';

export async function getVideoById(id: string): Promise<TVideo | null> {
    try {
        const filePath = path.join(process.cwd(), 'data', 'videos.json');
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const videos: TVideo[] = JSON.parse(fileContents);

        const video = videos.find((video) => video.id === id);

        if (!video) {
            return null;
        }
        return video;
    } catch (error) {
        console.error('[getVideoById] Error reading videos file:', error);
        return null;
    }
}

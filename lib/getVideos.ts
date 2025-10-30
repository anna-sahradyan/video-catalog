import { TVideo } from '@/types/video';
import fs from 'fs/promises';
import path from 'path';

export async function getVideos(): Promise<TVideo[]> {
    const filePath = path.join(process.cwd(), 'data', 'videos.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

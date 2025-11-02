'use client';

import { TVideo } from '@/types/video';
import { formatDuration } from '@/hooks/formatDuration';
import GoBackButton from '@/components/GoBackButton';
import Image from 'next/image';

export const VideoDetail = ({ video }: { video: TVideo }) => {
    return (
        <div className="max-w-4xl mx-auto mt-[130px] ">
            <div className="flex w-full gap-2 max-w-full xs:max-w-full sm:max-w-[80%] justify-between items-center text-center">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2">
                    {video.title}
                </h1>
                <GoBackButton />
            </div>

            <p className="text-gray-600 mb-2">
                <span className="font-bold text-[16px]">Автор:</span>{' '}
                {video.author}
            </p>
            <p className="text-gray-500 mb-2">
                <span className="font-bold text-[16px]">Длительность:</span>{' '}
                {formatDuration(video.durationSec)}
            </p>
            <p className="text-gray-500 mb-6">
                <span className="font-bold text-[16px]">Опубликовано:</span>{' '}
                {new Date(video.publishedAt).toLocaleDateString('ru-RU')}
            </p>

            <div className="mb-6 rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Image
                    src={video.thumbnail.trim()}
                    alt={video.title}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                    priority
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
            </div>

            {video.url && (
                <div className="aspect-video bg-black rounded overflow-hidden">
                    <iframe
                        src={`https://www.youtube.com/embed/${extractYouTubeId(video.url)}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
            )}
        </div>
    );
};

function extractYouTubeId(url: string): string {
    const regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.trim().match(regExp);
    return match && match[2].length === 11 ? match[2] : '';
}

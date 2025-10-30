'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { TVideo } from '@/types/video';
import { formatDuration } from '@/hooks/formatDuration';

interface VideoGridProps {
    videos: TVideo[];
    excludeFirst?: number;
    handleCardClick?: (videoId: string) => void;
}

export const VideoGrid = ({
    videos,
    excludeFirst = 0,
    handleCardClick
}: VideoGridProps) => {
    const displayedVideos =
        excludeFirst > 0 ? videos.slice(excludeFirst) : videos;

    if (displayedVideos.length === 0) {
        console.log('[VideoGrid] Нет видео для отображения.');
        return null;
    }

    return (
        <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {displayedVideos.map((video) => {
                if (!video || !video.id) {
                    return null;
                }

                return (
                    <Link
                        key={video.id}
                        href={`/video/${video.id}`}
                        className='focus:outline-none'
                    >
                        <div
                            className='relative rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer focus:outline focus:outline-blue-500'
                            onClick={() => handleCardClick?.(video.id)}
                        >
                            {video.is_new && (
                                <span className='absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded z-10'>
                                    New
                                </span>
                            )}

                            <div className='relative w-full pt-[56.25%] overflow-hidden rounded'>
                                <Image
                                    src={video.thumbnail}
                                    alt={video.title}
                                    fill
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    loading='lazy'
                                    sizes='(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw'
                                    unoptimized={true}
                                />
                            </div>
                            <h3 className='font-semibold mt-2 line-clamp-1'>
                                {video.title}
                            </h3>
                            <p className='text-sm text-gray-600'>
                                {video.author}
                            </p>
                            <p className='text-sm text-gray-500'>
                                {formatDuration(video.durationSec)}
                            </p>
                            <p className='text-sm text-gray-500'>
                                {new Date(video.publishedAt).toLocaleDateString(
                                    'ru-RU'
                                )}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

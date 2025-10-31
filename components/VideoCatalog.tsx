'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { VideoGrid } from '@/components/VideoGrid';
import { SearchForm } from '@/components/search-form/SearchForm';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { TVideo } from '@/types/video';
import Loading from '@/app/loading';
interface VideoCatalogProps {
    videos: TVideo[];
}

const getDurationFilterFromQuery = (
    queryValue: string | null
): 'short' | 'medium' | 'long' | null => {
    if (
        queryValue === 'short' ||
        queryValue === 'medium' ||
        queryValue === 'long'
    ) {
        return queryValue;
    }
    return null;
};

export const VideoCatalog: React.FC<VideoCatalogProps> = ({ videos }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState<string>(
        searchParams.get('search') || ''
    );
    const [durationFilter, setDurationFilter] = useState<
        'short' | 'medium' | 'long' | null
    >(getDurationFilterFromQuery(searchParams.get('duration')));

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams.toString());
        let changed = false;

        if (debouncedSearchQuery.trim()) {
            if (currentParams.get('search') !== debouncedSearchQuery) {
                currentParams.set('search', debouncedSearchQuery);
                changed = true;
            }
        } else {
            if (currentParams.has('search')) {
                currentParams.delete('search');
                changed = true;
            }
        }

        if (durationFilter) {
            if (currentParams.get('duration') !== durationFilter) {
                currentParams.set('duration', durationFilter);
                changed = true;
            }
        } else {
            if (currentParams.has('duration')) {
                currentParams.delete('duration');
                changed = true;
            }
        }

        if (changed) {
            router.replace(`${pathname}?${currentParams.toString()}`);
        }
    }, [debouncedSearchQuery, durationFilter, router, pathname, searchParams]); // Added searchParams to dependencies

    const handleCardClick = (videoId: string) => {
        router.push(`/video/${videoId}`);
    };

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
        },
        []
    );

    const handleDurationFilterChange = useCallback(
        (filter: 'short' | 'medium' | 'long' | null) => {
            setDurationFilter(filter);
        },
        []
    );

    const handleResetFilters = useCallback(() => {
        setSearchQuery('');
        setDurationFilter(null);
    }, []);

    const filteredVideos = useMemo(() => {
        if (!videos) return [];

        let result = [...videos];

        if (debouncedSearchQuery.trim()) {
            const query = debouncedSearchQuery.toLowerCase();
            result = result.filter(
                (video) =>
                    video.title.toLowerCase().includes(query) ||
                    video.author.toLowerCase().includes(query)
            );
        }

        if (durationFilter) {
            result = result.filter((video) => {
                if (durationFilter === 'short') return video.durationSec < 300;
                if (durationFilter === 'medium')
                    return (
                        video.durationSec >= 300 && video.durationSec <= 1200
                    );
                if (durationFilter === 'long') return video.durationSec > 1200;
                return true;
            });
        }

        result.sort((a, b) => {
            if (a.is_new && !b.is_new) return -1;
            if (!a.is_new && b.is_new) return 1;
            return (
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
            );
        });

        return result;
    }, [videos, debouncedSearchQuery, durationFilter]);

    if (!videos) {
        return (
            <div className='w-full mt-20'>
                <SearchForm value={searchQuery} onChange={handleSearchChange} />

                <div className='flex flex-wrap gap-2 mb-4 justify-between'>
                    <Loading/>
                </div>

                <section>
                    <h2 className='text-xl font-bold '>Рекомендуем</h2>
                    <div className=' w-full max-w-[700px] mx-auto'>
                        <Skeleton height={500} />
                    </div>
                </section>

                <section>
                    <h2 className='text-xl font-bold '>Все видео</h2>
                    <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className='border rounded p-2'>
                                <Skeleton height={180} />
                                <Skeleton />
                                <Skeleton width='60%' />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className='w-full mt-20'>
            <div className='flex items-center justify-center mt-4'>
                <SearchForm value={searchQuery} onChange={handleSearchChange} />
            </div>

            <div className='flex flex-wrap gap-2 justify-between px-2'>
                <button
                    onClick={() => handleDurationFilterChange(null)}
                    className={`w-full max-w-[150px] border rounded-lg px-4 py-2 text-sm sm:text-base ${
                        !durationFilter
                            ? 'bg-[#121D2B] text-white'
                            : 'bg-white text-gray-700'
                    } hover:bg-gradient transition-colors duration-300`}
                >
                    Все
                </button>
                <button
                    onClick={() => handleDurationFilterChange('short')}
                    className={`w-full max-w-[150px] border rounded-lg px-4 py-2 text-sm sm:text-base ${
                        durationFilter === 'short'
                            ? 'bg-[#121D2B] text-white'
                            : 'bg-white text-gray-700'
                    } hover:bg-gradient transition-colors duration-300`}
                >
                    До 5 мин
                </button>
                <button
                    onClick={() => handleDurationFilterChange('medium')}
                    className={`w-full max-w-[150px] border rounded-lg px-4 py-2 text-sm sm:text-base ${
                        durationFilter === 'medium'
                            ? 'bg-[#121D2B] text-white'
                            : 'bg-white text-gray-700'
                    } hover:bg-gradient transition-colors duration-300`}
                >
                    5–20 мин
                </button>
                <button
                    onClick={() => handleDurationFilterChange('long')}
                    className={`w-full max-w-[150px] border rounded-lg px-4 py-2 text-sm sm:text-base ${
                        durationFilter === 'long'
                            ? 'bg-[#121D2B] text-white'
                            : 'bg-white text-gray-700'
                    } hover:bg-gradient transition-colors duration-300`}
                >
                    Более 20 мин
                </button>
            </div>

            {filteredVideos.length === 0 && (
                <div className='flex flex-col items-center justify-center my-8 p-4 bg-gray-100 rounded-lg'>
                    <p className='text-lg text-gray-700 mb-4'>
                        Видео не найдены по текущим фильтрам.
                    </p>
                    <button
                        onClick={handleResetFilters}
                        className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300'
                    >
                        Сбросить фильтры
                    </button>
                </div>
            )}

            {filteredVideos.length > 0 && (
                <>

                    <section className='mt-8'>
                        <h2 className='text-xl font-bold mb-4'>Все видео</h2>
                        <VideoGrid
                            videos={filteredVideos}
                            handleCardClick={handleCardClick}
                        />
                    </section>
                </>
            )}
        </div>
    );
};

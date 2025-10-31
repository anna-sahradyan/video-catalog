
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Loading() {
    return (
        <div className='w-full mt-20'>
            <div className='flex items-center justify-center mt-4'>
                <Skeleton width={300} height={40} />
            </div>

            <div className='flex flex-wrap gap-2 justify-between px-2'>
                <Skeleton width={150} height={40} />
                <Skeleton width={150} height={40} />
                <Skeleton width={150} height={40} />
                <Skeleton width={150} height={40} />
            </div>

            <section className='mt-8'>
                <h2 className='text-xl font-bold mb-4'>
                    <Skeleton width={200} />
                </h2>
                <div className='max-w-[700px] mx-auto'>
                    <Skeleton height={500} />
                </div>
            </section>

            <section className='mt-8'>
                <h2 className='text-xl font-bold mb-4'>
                    <Skeleton width={200} />
                </h2>
                <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className=' rounded p-2'>
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

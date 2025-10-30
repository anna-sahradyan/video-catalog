import { useRouter } from 'next/navigation';
import { ArrowLeft } from '@/components/Icons/ArrowLeft';

export default function GoBackButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.back()}
            className='cursor-pointer flex items-center gap-2 hover:text-blue-800 font-medium'
        >
            <ArrowLeft />{' '}
            <span className={'text-base sm:text-lg md:text-xl lg:text-2xl font-bold'}>На главную</span>
        </button>
    );
}

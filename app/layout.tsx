'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';
import { Header } from '@/components/header/Header';

const queryClient = new QueryClient();

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='ru'>
            <body className='min-h-screen bg-white w-full '>
                <QueryClientProvider client={queryClient}>
                    <div className='flex flex-col min-h-screen justify-center items-center '>
                        <div className='w-full max-w-[1200px] mx-auto   p-[10px]'>
                            <Header />
                            {children}
                        </div>
                    </div>
                </QueryClientProvider>
            </body>
        </html>
    );
}

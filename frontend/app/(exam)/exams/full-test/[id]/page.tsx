'use client';
import ListeningSection from '@/components/MockTest/listening';
import { fetcher } from '@/app/api/auth/fetcher';
import useSWR from 'swr';
import { notFound } from 'next/navigation';
import ReadingSection from '@/components/MockTest/reading';
import WritingSection from '@/components/MockTest/writing';

export default  function MockTest({params}: {params: {id: string}}) {
    const testId  = params.id
    const { data, error } = useSWR(`/mocktests/${testId}/`, fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;


    return (
        <div>
            <ReadingSection />
        </div>
    );
};

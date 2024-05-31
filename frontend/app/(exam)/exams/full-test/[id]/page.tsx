'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import ListeningSection from '@/components/MockTest/listening';
import ReadingSection from '@/components/MockTest/reading';
import WritingSection from '@/components/MockTest/writing';
import { fetcher } from '@/app/api/auth/fetcher';

const MockTest = ({ params }: { params: { id: string } }) => {
    const { id: testId } = params;
    const { data, error } = useSWR(`/mocktests/${testId}/`, fetcher);
    const router = useRouter();
    const [sectionNumber, setSectionNumber] = useState<number>(0);
    const [answers, setAnswers] = useState({
        listening: {},
        reading: {},
        writing: {},
    });

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    const handleNextStep = (sectionAnswers: object) => {
        const newAnswers = { ...answers };
        console.log(newAnswers);

        if (sectionNumber === 0) {
            newAnswers.listening = sectionAnswers;
        } else if (sectionNumber === 1) {
            newAnswers.reading = sectionAnswers;
        } else if (sectionNumber === 2) {
            newAnswers.writing = sectionAnswers;
        }

        setAnswers(newAnswers);

        if (sectionNumber < 2) {
            setSectionNumber((prev) => prev + 1);
        } else {
            // Submit all answers and navigate to feedback
            console.log('Submitting all answers:', newAnswers);
            // Replace this with actual submission logic
            router.push('/feedback'); // Navigate to feedback page
        }
    };

    const sectionComponents = [
        <ListeningSection key="listening" submitSectionForm={handleNextStep} />
        
    ];

    return <div>{sectionComponents[sectionNumber]}</div>;
};

export default MockTest;

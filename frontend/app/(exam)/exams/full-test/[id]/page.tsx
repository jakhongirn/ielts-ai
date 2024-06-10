"use client";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import ListeningSection from "@/components/MockTest/listening";
import ReadingSection from "@/components/MockTest/reading";
import WritingSection from "@/components/MockTest/writing";
import { fetcher } from "@/app/api/auth/fetcher";
import { UserAnswerDataType } from "@/types/mocktest";

const MockTest = ({ params }: { params: { id: string } }) => {
    const { id: testId } = params;
    const { data, error } = useSWR(`/user-mocktests/${testId}/`, fetcher);
    const router = useRouter();
    const [sectionNumber, setSectionNumber] = useState<number>(0);
    const [answers, setAnswers] = useState({
        user_answers: {
            listening: {},
            reading: {},
            writing: {},
        },
    });

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    const readingData = data.sections.reading;
    const listeningData = data.sections.listening;
    const writingData = data.sections.writing;

   const transformAnswersListToObject = (data: UserAnswerDataType) => {
    const answers = data.user_answers
    return Object.keys(answers).reduce((acc, key)=> {
        if (answers[key]) {
            acc[key] = answers[key] as string;
        }
        return acc;
    }, {} as { [key: string]: string})
   }


    const handleNextStep = async (sectionAnswers: UserAnswerDataType) => {
        const newAnswers = { ...answers };

        if (sectionNumber === 0) {
            newAnswers.user_answers.listening = sectionAnswers;
        } else if (sectionNumber === 1) {
            newAnswers.user_answers.reading = sectionAnswers;
        } else if (sectionNumber === 2) {
            newAnswers.user_answers.writing = sectionAnswers;
        }

        const jsonAnswers = JSON.stringify(newAnswers);
        console.log(jsonAnswers);
        setAnswers(newAnswers);

        if (sectionNumber < 2) {
            setSectionNumber((prev) => prev + 1);
        } else {
            // Submit all answers and navigate to feedback
            console.log("Submitting all answers:", newAnswers);

            // Replace this with actual submission logic
            router.push("/dashboard/results"); // Navigate to feedback page
        }
    };

    function handleListeningSubmission() {
        //pass
    }

    function handleReadingSubmission() {
        //pass
    }

    function handleWritingSubmission() {
        //pass
    }

    const sectionComponents = [
        <ListeningSection
            key="listening"
            mockTestData={listeningData}
            submitSectionForm={handleNextStep}
        />,
        <ReadingSection
            key="reading"
            mockTestData={readingData}
            submitSectionForm={handleNextStep}
        />,
        <WritingSection
            key="writing"
            mockTestData={writingData}
            submitSectionForm={handleNextStep}
        />,
    ];

    return <div>{sectionComponents[sectionNumber]}</div>;
};

export default MockTest;

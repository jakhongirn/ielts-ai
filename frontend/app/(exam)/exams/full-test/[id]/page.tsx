"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import ListeningSection from "@/components/MockTest/listening";
import ReadingSection from "@/components/MockTest/reading";
import WritingSection from "@/components/MockTest/writing";
import { fetcher } from "@/app/api/auth/fetcher";
import { UserAnswerDataType } from "@/types/mocktest";
import { PreventNavigation } from "@/components/PreventNavigation";
import { postUserAnswers, postUserWritingToAI } from "../../../../api/mocktest/utils";
import Loading from "../../../Loading";


const MockTest = ({ params }: { params: { id: string } }) => {
    const { id: testId } = params;
    const { data, error } = useSWR(`/user-mocktests/${testId}/`, fetcher);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [sectionNumber, setSectionNumber] = useState<number>(0);
    const [answers, setAnswers] = useState({
        listening: {},
        reading: {},
        writing: {},
    });

    // Prevent user from leaving the pag
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue =
                "Are you sure you want to leave? Your progress will be lost.";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    const readingData = data.sections.reading;
    const listeningData = data.sections.listening;
    const writingData = data.sections.writing;

    const transformAnswersListToObject = (data: UserAnswerDataType) => {
        const answers = data.user_answers;
        return Object.keys(answers).reduce(
            (acc, key) => {
                if (answers[key]) {
                    acc[key] = answers[key] as string;
                }
                return acc;
            },
            {} as { [key: string]: string }
        );
    };

    

    const handleNextStep = async (sectionAnswers: UserAnswerDataType) => {
        setLoading(true)
        const newAnswers = { ...answers };
        console.log(sectionAnswers);

        if (sectionNumber === 0) {
            newAnswers.listening =
                transformAnswersListToObject(sectionAnswers);
        } else if (sectionNumber === 1) {
            newAnswers.reading =
                transformAnswersListToObject(sectionAnswers);
        } else if (sectionNumber === 2) {
            newAnswers.writing = sectionAnswers;
        }

        setAnswers(newAnswers);

        if (sectionNumber < 2) {
            setSectionNumber((prev) => prev + 1);
        } else {
            
        
            newAnswers.writing["mocktest_id"] = testId;
            // Submit all answers and navigate to feedback
            console.log("Submitting all answers:", newAnswers);

            postUserAnswers(testId, newAnswers);
            try {
                const data = await postUserWritingToAI(newAnswers.writing);
                
            } catch (error) {
                console.error('Submission error:', error);
                router.push("/dashboard/results/"); 
            } finally {
                setLoading(false);
                router.push("/dashboard/results/"); 
            }
            
            // Replace this with actual submission logic
        
            router.push("/dashboard/results/"); // Navigate to feedback page
        }
        setLoading(false)
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

    return <>
    
    {sectionComponents[sectionNumber]}
    {!loading && <Loading />}
    </>;
};

export default MockTest;

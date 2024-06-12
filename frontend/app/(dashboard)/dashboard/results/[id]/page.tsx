'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { AuthActions } from "@/app/api/auth/utils";
import WritingFeedback from "./WritingFeedback";


interface Result {
    user_answer: string;
    correct_answer: string;
    is_correct: boolean;
}

interface UserAnswerDetail {
    mocktest_title: string;
    listening_results: Record<string, Result>;
    reading_results: Record<string, Result>;
    listening_score: number;
    reading_score: number;
    listening_band: string;
    reading_band: string;
    passed_date: string;
    writing_feedback: string;
}

const UserAnswerDetailPage: React.FC = ({ params }: { params: { id: string } }) => {
    const { id: mocktest_id } = params;
    const [userAnswer, setUserAnswer] = useState<UserAnswerDetail | null>(null);
    const {getToken} = AuthActions();

    const token = getToken("access");

    console.log(mocktest_id)
    useEffect(() => {
        const fetchUserAnswer = async () => {
            if (!mocktest_id) return <div>No results for this mocktest.</div>;
            
            const url = `${process.env.NEXT_PUBLIC_API}/user-answers/${mocktest_id}/`;

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Replace with actual token
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        "Network response was not ok " + response.statusText
                    );
                }

                const data = await response.json();
                setUserAnswer(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUserAnswer();
    }, [mocktest_id]);

    if (!userAnswer) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Answer Details</h1>
            <div className="mb-6">
            <div className="bg-white shadow rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-2">{userAnswer.mocktest_title}</h2>
                <p><span className="font-semibold">Listening Score</span>: {userAnswer.listening_score}</p>
                <p><span className="font-semibold">Reading Score</span>: {userAnswer.reading_score}</p>
                <p><span className="font-semibold">Listening Band</span>: {userAnswer.listening_band}</p>
                <p><span className="font-semibold">Reading Band</span>: {userAnswer.reading_band}</p>
                <p><span className="font-semibold">Date:</span> {formatDate(userAnswer.passed_date)}</p>
            </div>
                <h2 className="text-xl font-semibold mb-2">
                    Listening Results
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(userAnswer.listening_results).map(
                        ([question, result]) => (
                            <div
                                key={question}
                                className="bg-white shadow rounded-lg p-4"
                            >
                                <p className="font-semibold">Question {question}:</p>
                                <p>Your answer: {result.user_answer}</p>
                                <p>Correct answer: {result.correct_answer}</p>
                                <p>
                                    {result.is_correct
                                        ? "✅ Correct"
                                        : "❌ Incorrect"}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Reading Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(userAnswer.reading_results).map(
                        ([question, result]) => (
                            <div
                                key={question}
                                className="bg-white shadow rounded-lg p-4"
                            >
                                <p className="font-semibold">Question {question}:</p>
                                <p>Your Answer: {result.user_answer}</p>
                                <p>Correct Answer: {result.correct_answer}</p>
                                <p>
                                    {result.is_correct
                                        ? "✅ Correct"
                                        : "❌ Incorrect"}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>

        </div>
        <div className="my-6 flex">
        {userAnswer.writing_feedback ? (<WritingFeedback response={userAnswer.writing_feedback} />) : <p>No feedback for writing.</p>}
    </div>
    </>
    );
};

export default UserAnswerDetailPage;

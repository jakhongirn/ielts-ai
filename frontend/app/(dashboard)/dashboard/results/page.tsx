"use client";
import { AuthActions } from "@/app/api/auth/utils";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface UserAnswer {
    id: number;
    mocktest_id: string;
    mocktest_title: string;
    passed_date: string;
    listening_band: number;
    reading_band: number;
    listening_score: number;
    reading_score: number;
}

const ResultsPage = () => {
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

    const router = useRouter();
    const { getToken } = AuthActions();
    useEffect(() => {
        const fetchUserAnswers = async () => {
            const url = `${process.env.NEXT_PUBLIC_API}/user-answers/`;
            const token = getToken("access");
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
                setUserAnswers(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUserAnswers();
    }, []);
    const handleCardClick = (mocktest_id: string) => {
        router.push(`/dashboard/results/${mocktest_id}`);
    };

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Results</h1>
            </div>
            <div className="rounded-lg border w-full p-4 bg-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                    {userAnswers.map((answer, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCardClick(answer.mocktest_id)}
                        >
                            <h2 className="text-lg ">
                                Mock Test Title: <span className="font-semibold">{answer.mocktest_title}</span>
                            </h2>
                            <p className="text-gray-600">Passed Date: {formatDate(answer.passed_date)}</p>
                            <p className="text-gray-600">Listening Band: {answer.listening_band}</p>
                            
                            
                            <p className="text-gray-600">Reading Band: {answer.reading_band}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;

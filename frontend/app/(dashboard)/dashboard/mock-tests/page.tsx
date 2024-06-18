"use client";

import React, { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import MockTestCard from "./MockTestCard";
import { AuthActions } from "@/app/api/auth/utils";
import useSWR from "swr";
import { fetcher } from "@/app/api/auth/fetcher";
import {getUserMockTests} from "@/app/api/mocktest/utils";

interface UserMockTest {
    id: number;
    reading_answers: string;
    listening_answers: string;
    writing_answers: string;
    feedback: string;
    status: string;
    date: string;
    type: string;
    mocktest:string;
    mocktest_details: {
        id:string;
        title: string;
        description: string;
    };
    user_profile: string;
}

const authActions = AuthActions();

const MockPage: React.FC = () => {
    const [mockTests, setMockTests] = useState<UserMockTest[]>([]);
    const { data: user, error: userError } = useSWR("/auth/user/", fetcher);

    useEffect(() => {
        const fetchMockTests = async () => {
            if (!user) return;

            try {
                const data: UserMockTest[] =
                    await getUserMockTests();
                setMockTests(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching mock tests:", error);
            }
        };

        fetchMockTests();
    }, [user]);

    if (userError) return <p>Error loading user information.</p>;
    if (!user) return <p className='text-center text-gray-400 p-8'>You have no mocktests.</p>;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    IELTS Mock Tests
                </h1>
            </div>
            <div className="rounded-lg border w-full bg-gray-100 p-4">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="border-b border-gray-200">
                        <Tabs.Root defaultValue="mock">
                            <Tabs.Content value="mock" className="my-4">
                                <h1 className="text-2xl font-bold my-4">
                                    List of Mock tests
                                </h1>

                                {mockTests.length === 0 ? (
                                    <p>No mock tests available.</p>
                                ) : (
                                    <div className="grid grid-cols-3 gap-6 px-4 py-2">
                                        {mockTests.map((test, index) => (
                                            <MockTestCard
                                                key={index}
                                                mocktestId={test.mocktest}
                                                title={test.mocktest_details.title}
                                                description={
                                                    test.mocktest_details.description
                                                }
                                                status={test.status}
                                            />
                                        ))}
                                    </div>
                                )}
                            </Tabs.Content>
                        </Tabs.Root>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockPage;

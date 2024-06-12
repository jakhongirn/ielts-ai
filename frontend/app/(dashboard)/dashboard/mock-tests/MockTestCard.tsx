"use client";

import React from "react";
import { useState } from "react";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Modal from "@/components/Dashboard/Modal";

interface MockTestCardProps {
    mocktestId: string;
    status: string;
    title: string;
    description: string;
}

const MockTestCard = ({
    title,
    description,
    status,
    mocktestId,
}: MockTestCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const [isPassedTest, setIsPassedTest] = useState(status);

    const startTest = () => {
        setIsModalOpen(false);
        // Navigate to the test page and start with the listening section
        router.push(`/exams/full-test/${mocktestId}`);
    };
    return (
        <div>
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                    <p>{status}</p>
                </CardHeader>

                <div className="flex justify-center px-2">
                    <Image
                        width={300}
                        height={300}
                        src="/images/dashboard/mock-tests/mock-test-1.webp"
                        alt="mock-test-1"
                        className="rounded-lg "
                    />
                </div>
                {isPassedTest=="NEW" ? (
                    <CardFooter className="flex justify-center">
                        <Button
                            className="hover:bg-black hover:text-white mt-4"
                            variant="outline"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Pass the test
                        </Button>
                    </CardFooter>
                ) : (
                    <CardFooter className="flex justify-center">
                        <Button
                            className="hover:bg-black hover:text-white mt-4"
                            variant="outline"
                        >
                            See the result
                        </Button>
                    </CardFooter>
                )}
            </Card>

            <Modal
                isOpen={isModalOpen}
                title="Are you ready to start the full IELTS Test?"
                description="Make sure you are prepared. You will start with the Listening section, followed by Reading, Writing, and Speaking sections."
                onConfirm={startTest}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default MockTestCard;

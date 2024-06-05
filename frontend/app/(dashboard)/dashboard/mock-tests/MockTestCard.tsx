"use client";

import React from "react";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/components/Dashboard/Modal";

const MockTestCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const testId = "0e06e6ef-887b-42a6-a35b-e782250f4165"; // Example test ID, adjust as needed
    const router = useRouter();

    
    const startTest = () => {
        setIsModalOpen(false);
        // Navigate to the test page and start with the listening section
        router.push(`/exams/full-test/${testId}`);
      };
    return (
        <div>
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Mock test A</CardTitle>
                    <CardDescription>Full sections</CardDescription>
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
                <CardFooter className="flex justify-center">
                    <Button
                        className="hover:bg-black hover:text-white"
                        variant="outline"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Pass the test
                    </Button>
                </CardFooter>
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

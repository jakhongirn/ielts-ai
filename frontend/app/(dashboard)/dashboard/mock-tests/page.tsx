"use client";

import React from "react";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
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
import MockTestCard from "./MockTestCard";

const MockPage = () => {
    const [selectedTab, setSelectedTab] = useState("mock");
    return (
        <div className="flex flex-1  flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">
                    IELTS Mock Tests
                </h1>
            </div>
            <div className="rounded-lg border w-full bg-gray-100 p-4">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="border-b border-gray-200">
                        <Tabs.Root
                            defaultValue="mock"
                            onValueChange={setSelectedTab}
                        >
                            <Tabs.Content value="mock" className="my-4">
                                <h1 className="text-2xl font-bold my-4">
                                    List of Mock tests
                                </h1>
                                <div className="flex flex-wrap gap-6 px-4 py-2">
                                    <MockTestCard />

                                    <Card className="shadow-md">
                                        <CardHeader>
                                            <CardTitle>Mock test B</CardTitle>
                                            <CardDescription>
                                                Full sections
                                            </CardDescription>
                                        </CardHeader>

                                        <div className="flex justify-center px-2">
                                            <Image
                                                width={300}
                                                height={300}
                                                src="/images/dashboard/mock-tests/mock-test-2.webp"
                                                alt="mock-test-1"
                                                className="rounded-lg "
                                            />
                                        </div>
                                        <CardFooter className="flex justify-center">
                                            <Button
                                                className="hover:bg-black hover:text-white"
                                                variant="outline"
                                            >
                                                Pass the test
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </Tabs.Content>
                            <Tabs.Content value="score" className="my-4">
                                <p className="text-sm text-gray-600">
                                    All passed tests will be here
                                </p>
                            </Tabs.Content>
                        </Tabs.Root>
                    </div>
                </div>
            </div>
        </div>
    );
};

MockPage.disableLayout = true;

export default MockPage;

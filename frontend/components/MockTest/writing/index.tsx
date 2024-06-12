"use client";
import React from "react";
import MockHeader from "../header";
import MockBody from "./body";
import { useState } from "react";
import MockFooter from "../footer";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserWritingAnswerType } from "@/types/mocktest";

type WritingSectionProps = {
    submitSectionForm: (data: object) => void;
    mockTestData?: object | any;
};

const WritingSection = ({
    submitSectionForm,
    mockTestData,
}: WritingSectionProps) => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [activePart, setActivePart] = useState<number>(1);

    const methods = useForm<UserWritingAnswerType>();

    const onSubmit: SubmitHandler<UserWritingAnswerType> = async (data, e) => {
        e?.preventDefault();

        submitSectionForm(data);
        // setLoading(true);
        // console.log(data);

        // try {
        //     const response = await axios.post(
        //         `${process.env.NEXT_PUBLIC_API}/prompt/`,
        //         data
        //     );
        //     data = response.data;
        //     console.log("API Response:", data);
        //     setLoading(false);

        //     if (data.id) {
        //         window.location.href = `/feedback?promptId=${data.id}`;
        //     }
        //     router.push("/feedback");
        // } catch (error) {
        //     console.error("Error submitting data to API:", error);
        //     setLoading(false);
        // }
    };

    return (
        <div className="mock-test">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <MockHeader
                        duration={60}
                        bgColor="bg-blue-500"
                        fontColor="text-blue-500"
                    />
                    <MockBody
                        mockTestData={mockTestData}
                        activePart={activePart}
                    />
                </form>
            </FormProvider>
            <MockFooter
                fontColor="text-blue-500"
                setActivePart={setActivePart}
                sectionPart={mockTestData}
            />
        </div>
    );
};

export default WritingSection;

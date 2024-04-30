'use client';
import React from "react";
import MockHeader from "../header";
import MockBody from "./body";
import { useState } from "react";
import MockFooter from "../footer";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

type UserAnswerData = {
    task1: string;
    task2: string;
};

const WritingSection = () => {
    //   const {
    //     register,
    //     watch,
    //     formState: { errors },
    // } = useForm<{ essay: string }>({
    //     defaultValues: {
    //         essay: "",
    //     },
    // });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const methods = useForm<UserAnswerData>();

    const onSubmit: SubmitHandler<UserAnswerData> = async (data, e) => {
        setLoading(true);
        console.log(data);

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/prompt/`,
                data
            );
            data = response.data;
            console.log("API Response:", data);
            setLoading(false);

            if (data?.id) {
              window.location.href = `/feedback?promptId=${data.id}`
            }
            router.push("/feedback");
        } catch (error) {
            console.error("Error submitting data to API:", error);
            setLoading(false);
        }
    };
    const [activePart, setActivePart] = useState<number>(1);
    return (
        <div className="mock-test">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <MockHeader
                        duration={60}
                        bgColor="bg-blue-500"
                        fontColor="text-blue-500"
                    />
                    <MockBody activePart={activePart} />
                </form>
            </FormProvider>
            <MockFooter
                section="writing"
                fontColor="text-blue-500"
                setActivePart={setActivePart}
            />
        </div>
    );
};

export default WritingSection;

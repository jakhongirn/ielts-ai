'use client';
import React from "react";
import MockHeader from "../header";
import MockBody from "./body";
import { useState } from "react";
import MockFooter from "../footer";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

type WritingSectionProps = {
    handleSubmit: () => void;
};  

type UserAnswerData = {
    id: number;
    task1?: string;
    task2?: string;
}

const WritingSection = ({handleSubmit}: WritingSectionProps) => {
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
                `${process.env.NEXT_PUBLIC_API}/prompt/`,
                data
            );
            data = response.data;
            console.log("API Response:", data);
            setLoading(false);

            if (data.id) {
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
                        handleSubmit={handleSubmit}
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

"use client";

import React from "react";
import MockHeader from "../header";
import MockBody from "./body";
import { useState } from "react";
import MockFooter from "../footer";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

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

    const methods = useForm<UserAnswerData>();

    const onSubmit: SubmitHandler<UserAnswerData> = async (data, e) => {
        e?.preventDefault();
        console.log(data);
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
                    <MockFooter
                        section="writing"
                        fontColor="text-blue-500"
                        setActivePart={setActivePart}
                    />
                </form>
            </FormProvider>
        </div>
    );
};

export default WritingSection;

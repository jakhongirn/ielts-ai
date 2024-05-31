"use client";
import React from "react";
import MockBody from "./body";
import { useState } from "react";
import MockFooter from "../footer";
import MockHeader from "../header";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { UserAnswerDataType } from "@/types/mocktest";

type ListeningSectionProps = {
    submitSectionForm: (data: object) => void;
};

const ListeningSection = ({ submitSectionForm }: ListeningSectionProps) => {
    const [activePart, setActivePart] = useState<number>(1);

    const methods = useForm<UserAnswerDataType>();
    const { handleSubmit } = methods;
    const onSubmit: SubmitHandler<UserAnswerDataType> = (data) => {
        submitSectionForm(data);
    };

    return (
        <div className="mock-test">
            <FormProvider {...methods}>
                <form id="listening-form" onSubmit={handleSubmit(onSubmit)}>
                    <MockHeader
                        duration={40}
                        bgColor="bg-green-500"
                        fontColor="text-green-500"
                    />
                    <MockBody methods={methods} activePart={activePart} />
                </form>
            </FormProvider>
            <MockFooter
                    section="listening"
                    setActivePart={setActivePart}
                    fontColor="text-green-500"
                />
        </div>
    );
};

export default ListeningSection;

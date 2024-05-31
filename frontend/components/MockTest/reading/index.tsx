"use client";

import React, { useState } from "react";
import MockHeader from "../header";
import MockBody from "./body";
import MockFooter from "../footer";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { UserAnswerDataType } from "@/types/mocktest";

type ReadingSectionProps = {
    submitSectionForm: (data: object) => void;
};

const ReadingSection = ({ submitSectionForm }: ReadingSectionProps) => {
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
                        fontColor="text-red-500"
                        bgColor="bg-red-500"
                        duration={60}
                    />
                    <MockBody methods={methods} activePart={activePart} />
                </form>
            </FormProvider>
            <MockFooter
                        fontColor="text-red-500"
                        setActivePart={setActivePart}
                        section="reading"
                    />
        </div>
    );
};

export default ReadingSection;

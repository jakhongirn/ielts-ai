"use client";

import React, { useState } from "react";
import MockHeader from "../header";
import MockBody from "./body";
import MockFooter from "../footer";
import { handleClientScriptLoad } from "next/script";

type ReadingSectionProps = {
    handleSubmit: () => void;
};

const ReadingSection = ({handleSubmit}: ReadingSectionProps) => {
    const [activePart, setActivePart] = useState<number>(1);

    return (
        <div className="mock-test">
            <MockHeader handleSubmit={handleSubmit} fontColor="text-red-500" bgColor="bg-red-500" duration={60} />
            <MockBody activePart={activePart} />
            <MockFooter
                fontColor="text-red-500"
                setActivePart={setActivePart}
                section="reading"
            />
        </div>
    );
};

export default ReadingSection;

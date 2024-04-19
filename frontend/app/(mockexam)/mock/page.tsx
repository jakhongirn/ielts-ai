"use client";

import React from "react";
import Mock from "@/components/MockTest/reading";

const MockPage = () => {
    return (
        <div className="mock-reading">
            <Mock />
        </div>
    );
};

MockPage.disableLayout = true;

export default MockPage;

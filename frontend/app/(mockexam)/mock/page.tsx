"use client";

import React from "react";
import Link from "next/link";
import useAuthProtected from "@/components/hooks/useAuthProtected";
import axios from "axios";

const MockPage = () => {
    const isAuthenticated = useAuthProtected();

    if (!isAuthenticated) {
        return <div>Redirecting...</div>;
    }
    return (
        <div className="mock-test h-screen">
            <h1 className="text-2xl text-center my-5 font-bold">
                IELTS Mock Test Sections
            </h1>
            <div className="flex justify-around h-screen items-center">
                <div className="border-2 border-red-500 bg-red-500 px-8 py-6 text-2xl rounded-xl hover:bg-transparent text-white hover:text-black duration-300">
                    <Link href="/mock/reading">Reading Section</Link>
                </div>

                <div className="border-2 border-green-500 px-8 py-6 text-2xl rounded-xl bg-green-500 hover:bg-transparent hover:text-black text-white duration-300">
                    <Link href="/mock/listening">Listening Section</Link>
                </div>

                <div className="border-2 border-blue-500 px-8 py-6 text-2xl rounded-xl bg-blue-500 hover:bg-transparent hover:text-black text-white duration-300">
                    <Link href="/mock/writing">Writing Section</Link>
                </div>
            </div>
        </div>
    );
};

MockPage.disableLayout = true;

export default MockPage;

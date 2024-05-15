"use client";

import React from "react";
import Link from "next/link";


const MockPage = () => {
   
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">IETLS Mock Tests</h1>
          </div>
          <div className="h-screen rounded-lg border w-full bg-gray-100"></div>
         
        </div>  
    );
};

MockPage.disableLayout = true;

export default MockPage;

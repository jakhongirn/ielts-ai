import { useState } from "react";

type MockFooterProps = {
    fontColor: string;
    setActivePart: (partNumber: number) => void;
    sectionPart: object | any;
};


const MockFooter = ({ fontColor, setActivePart, sectionPart }: MockFooterProps) => {
    
    return (
        <div className="fixed z-10 w-full py-2 text-center bottom-0 bg-gray-100 text-xl font-semibold shadow-2xl">
            {/* Tabs to switch between parts */}
            <div className="tabs flex gap-x-2 justify-between mx-4">
                {sectionPart.parts.map((part, index) => (
                    <button
                        key={index}
                        onClick={() => setActivePart(part.part_number)}
                        className={`${fontColor} w-full text-center border-2 py-1 rounded-xl border-gray-300`}
                    >
                        {sectionPart.partName} {part.part_number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MockFooter;

import React, { useState } from "react";
import Image from "next/image";
import MultiReadingPassage from "./multi-reading-passage";
import mockReadingData from "../data/mocktests.json";
import QuestionColumn from "../questionColumn";

const MockBody = () => {
    const [leftWidth, setLeftWidth] = useState("50%"); // Initial width as a string
    const [isDragging, setIsDragging] = useState(false);

    const startResizing = (e) => {
        setIsDragging(true);
        // Record the starting x position of the mouse
        const startX = e.clientX;
        const startWidth = e.currentTarget.previousElementSibling.offsetWidth;

        const doResize = (moveEvent) => {
            const currentWidth = startWidth + moveEvent.clientX - startX;
            setLeftWidth(`${currentWidth}px`);
        };

        const stopResize = () => {
            setIsDragging(false);
            document.removeEventListener("mousemove", doResize);
            document.removeEventListener("mouseup", stopResize);
        };

        document.addEventListener("mousemove", doResize);
        document.addEventListener("mouseup", stopResize);
    };

    const [activePart, setActivePart] = useState<number>(1);

    const renderReadingPart = (partNumber: number) => {
        const partData = mockReadingData.reading.parts.find(
            (part) => part.part_number === partNumber
        );

        if (!partData) {
            return <p>Part not found.</p>;
        }

        return (
            <div>
                <div>
                    <h1
                        id="partNumber"
                        className="text-2xl font-semibold uppercase"
                    >
                        Part {partData.part_number}
                    </h1>

                    <h1
                        id="readingPassage"
                        className="text-3xl font-bold uppercase my-2"
                    >
                        Reading Passage {partData.part_number}
                    </h1>

                    <p className="text-sm">{partData.instruction}</p>

                    <div className="w-full text-center my-2">
                        <Image
                            src={`/mock_images/${partData.imageURL}`}
                            alt="mock reading image"
                            layout="responsive"
                            width={1000}
                            height={500}
                        />
                    </div>
                    <div id="reading-passage">
                        <h1
                            id="reading-passage-title"
                            className="font-bold text-2xl text-center my-4 mx-4"
                        >
                            {partData.title}
                        </h1>
                        {partData.paragraphs.map((paragraph, idx) => (
                            <MultiReadingPassage
                                key={idx}
                                title={paragraph.title}
                                content={paragraph.content}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderQuestionPart = (partNumber: number) => {
        const partData = mockReadingData.reading.parts.find(
            (part) => part.part_number === partNumber
        );

        if (!partData) {
            return <p>Part not found.</p>;
        }

        return <QuestionColumn questionData={partData} />;
    };

    const MockFooter = () => {
        return (
            <div className="fixed z-10 w-full py-2 text-center bottom-0 bg-gray-100 text-xl font-semibold shadow-2xl">
                {/* Tabs to switch between parts */}
                <div className="tabs flex justify-between mx-4">
                    {mockReadingData.reading.parts.map((part) => (
                        <button
                            key={part.part_number}
                            onClick={() => setActivePart(part.part_number)}
                        >
                            Part {part.part_number}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="pt-16 pb-12 flex w-full h-screen">
                <div
                    id="leftColumn "
                    style={{ width: leftWidth }}
                    className="p-4 border-gray-400 h-full overflow-auto"
                >
                    <div id="reading-left-header">
                        <div>
                            <div className="reading-part-content">
                                {/* Render the active part based on the current state */}
                                {renderReadingPart(activePart)}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    onMouseDown={startResizing}
                    className="cursor-col-resize bg-gray-400 h-full w-1.5 select-none"
                />
                <div
                    id="rightColumn"
                    style={{ width: `calc(100% - ${leftWidth})` }}
                    className=" border-gray-400 p-4 h-full overflow-auto"
                >
                    {renderQuestionPart(activePart)}
                </div>
            </div>
            <MockFooter />
        </>
    );
};

export default MockBody;

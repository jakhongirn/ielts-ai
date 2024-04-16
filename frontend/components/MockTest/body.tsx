import React, { useState } from "react";
import Image from "next/image";
import MultiReadingPassage from "./multi-reading-passage";
import mockReadingData from "./mocktests.json";

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

    return (
        <div className="flex w-full">
            <div id="leftColumn h-screen overflow-auto"
                style={{ width: leftWidth }}
                className="p-4 border-r-2 border-gray-400"
            >
                <div id="reading-left-header">
                    <div>
                        
                    <div className="tabs">
                            {/* Tabs to switch between parts */}
                            {mockReadingData.reading.parts.map((part) => (
                                <button
                                    key={part.part_number}
                                    onClick={() =>
                                        setActivePart(part.part_number)
                                    }
                                >
                                    Part {part.part_number}
                                </button>
                            ))}
                    </div>
                        <div className="reading-part-content">
                            {/* Render the active part based on the current state */}
                            {renderReadingPart(activePart)}
                        </div>

                        
                    </div>
                </div>
            </div>

            <div
                onMouseDown={startResizing}
                className="cursor-col-resize  w-1.5 select-none"
            />
            <div
                id="rightColumn"
                style={{ width: `calc(100% - ${leftWidth})` }}
                className="border-l-2 border-gray-400 p-4"
            >
                Right Column
            </div>
        </div>
    );
};

export default MockBody;

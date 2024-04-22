import React, { useState } from "react";
import Image from "next/image";
import mockReadingData from "../data/mocktests.json";
import QuestionColumn from "../questionColumn";
import WritingTask1 from "../writing/taskPart";
import { useForm } from "react-hook-form";


const WritingSection = () => {
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
        const partData = mockReadingData.writing.parts?.find(
            (part) => part.part_number === partNumber
        );

        if (!partData) {
            return <p>Part not found.</p>;
        }

        return (
            <div>
                <div>
                    <h1
                        id="readingPassage"
                        className="text-3xl font-bold uppercase my-2"
                    >
                        Writing Task {partData.part_number}
                    </h1>

                    <div id="reading-passage">
                        <WritingTask1 questionData={partData} />
                    </div>
                </div>
            </div>
        );
    };

    const UserWritingPart: React.FC = () => {
        const {
            register,
            watch,
            formState: { errors },
        } = useForm<{ essay: string }>({
            defaultValues: {
                essay: "",
            },
        });

        // Watch the essay field and calculate word count
        const essayText = watch("essay");
        const wordCount = essayText.split(/\s+/).filter((word) => word).length;

        return (
            <form className="flex flex-col items-end p-4">
                <textarea
                    {...register("essay", { required: true })}
                    className={`w-full h-[440px] p-2 text-sm  border-2 ${
                        errors.essay ? "border-red-500" : "border-gray-300"
                    } shadow-inner mb-4 resize-none focus:outline-none focus:shadow-outline`}
                    placeholder="Type your essay here..."
                    aria-label="Essay text area"
                />
                {errors.essay && (
                    <p className="text-red-500 text-xs mb-4">
                        This field is required
                    </p>
                )}
                <div className="text-sm text-gray-700">
                    Words Count: {wordCount}
                </div>
                {/* Additional elements like navigation buttons can be added here */}
            </form>
        );
    };

    const MockFooter = ({ fontColor }) => {
        return (
            <div className="fixed z-10 w-full py-2 text-center bottom-0 bg-gray-100 text-xl font-semibold shadow-2xl">
                {/* Tabs to switch between parts */}
                <div className="tabs flex gap-x-2 justify-around mx-4">
                    {mockReadingData.writing.parts.map((part, index) => (
                        <button
                            key={index}
                            onClick={() => setActivePart(part.part_number)}
                            className={`${fontColor} w-full text-center border-2 py-1 rounded-xl border-gray-300`}
                        >
                            Task {part.part_number}
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
                    <UserWritingPart />
                </div>
            </div>
            <MockFooter fontColor="text-blue-500" />
        </>
    );
};

export default WritingSection;

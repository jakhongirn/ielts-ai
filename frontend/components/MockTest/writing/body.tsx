import React, { useEffect, useState } from "react";
import Image from "next/image";
import mockWritingData from "../data/mocktests.json";
import { useForm, useFormContext } from "react-hook-form";

type MockWritingBodyProps = {
    activePart: number;
};

const MockWritingBody = ({ activePart }: MockWritingBodyProps) => {
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
    

    const renderLeftColumn = (partNumber: number) => {
        const task = mockWritingData.writing.parts?.find(
            (part) => part.part_number === partNumber
        );

        if (!task) {
            return <p>Part not found.</p>;
        }

        const {register, setValue} = useFormContext();

        setValue('task_1_img', "data:image/webp;base64,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")

        // useEffect(() => {
        //     const convertImageToBase64 = async () => {
        //         const imageUrl = `/public/mock_images/${task.q_imageURL}` // Adjust the path to your image
        //         const response = await fetch(imageUrl);
        //         const blob = await response.blob();
        //         const reader = new FileReader();
        //         reader.onloadend = () => {
        //             setValue('task_1_img', reader.result); // Using react-hook-form's setValue to set base64 string
        //         };
        //         reader.readAsDataURL(blob);
        //     };
    
        //     convertImageToBase64();
        // }, [setValue]);

        

        return (
            <div>
                <h1
                    id="readingPassage"
                    className="text-3xl font-bold uppercase my-2"
                >
                    Writing Task {task.part_number}
                </h1>

                <div id="taskPart">
                    {task.q_instructions.map((instruction, index) => (
                        <div key={index}>
                            <p className="my-2 text-sm">{instruction.text}</p>
                        </div>
                    ))}

                    {task.type === "task-1" ? (
                        <div>
                            <Image
                                src={`/mock_images/${task.q_imageURL}`}
                                alt="task 1"
                                layout="responsive"
                                width={1000}
                                height={500}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
        );
    };

    const RenderRightColumn: React.FC = () => {
        const {register, formState: {errors}} = useFormContext();
        
        // const {
        //     register,
        //     watch,
        //     formState: { errors },
        // } = useForm<{ essay: string }>({
        //     defaultValues: {
        //         essay: "",
        //     },
        // });
        // Watch the essay field and calculate word count
        // const essayText = watch("essay");
        // const wordCount = essayText?.split(/\s+/).filter((word) => word).length;

        const [essayText, setEssayText] = useState<string>("");
        const [wordCount, setWordCount] = useState<number>(0);

        const handleEssayChange = (e) => {
            setEssayText(e.target.value);
            
        }

        useEffect(() => {
            const countWords = (text: string) => {
                return text.split(/\s+/).filter((word) => word).length;
            };
            setWordCount(countWords(essayText));
        }, [essayText]);

        const taskEssay = `task_${activePart}`
        return (
            <div className="flex flex-col items-end p-4">
                <textarea
                    {...register(taskEssay)}
                    className={`w-full h-[440px] p-2 text-sm  border-2 ${
                        errors.essay ? "border-red-500" : "border-gray-300"
                    } shadow-inner mb-4 resize-none focus:outline-none focus:shadow-outline`}
                    placeholder="Type your essay here..."
                    aria-label="Essay text area"
                    value={essayText}
                    onChange={handleEssayChange}
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
                                {renderLeftColumn(activePart)}
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
                    <RenderRightColumn />
                </div>
            </div>
        </>
    );
};

export default MockWritingBody;

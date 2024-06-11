import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, useFormContext } from "react-hook-form";

type MockWritingBodyProps = {
    activePart: number;
    mockTestData: object | any;
};

const MockWritingBody = ({ activePart, mockTestData }: MockWritingBodyProps) => {
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
        const task = mockTestData?.parts?.find(
            (part) => part.part_number === partNumber
        );

        if (!task) {
            return <p>Task not found.</p>;
        }

        const task1ImgURL = mockTestData?.parts[0].task1_imgURL;

        const {register, setValue} = useFormContext();

        setValue('task1_img', task1ImgURL)

        

        

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
                                src={task.task1_imgURL}
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
                    id="leftColumn"
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

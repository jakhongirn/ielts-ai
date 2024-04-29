import React from "react";
import Timer from "./timer";

type HeaderPropsType = {
    duration: number;
    fontColor: string;
    bgColor: string;
}

const MockHeader = ({duration, fontColor, bgColor}:HeaderPropsType) => {
    return (
        <div>
            <div className="w-full px-8 py-4 bg-white shadow-md flex justify-between fixed z-10">
                <div>
                    <h1 className="font-extrabold">Examiner.uz</h1>
                </div>
                <div>
                    <Timer
                        duration={duration}
                        fontColor={fontColor}
                        onTimeUp={() => {
                            console.log("Time is up!");
                        }}
                    />
                </div>

                <div>
                    <button className={`${bgColor} px-3 py-1 text-white rounded-xl`}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MockHeader;

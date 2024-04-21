import React from "react";
import Timer from "../timer";


const MockHeader = () => {
    return (
        <div>
            <div className="w-full px-8 py-4 bg-white shadow-md flex justify-between fixed z-10">
                <div>
                    <h1 className="font-extrabold">Examiner.uz</h1>
                </div>
                <div>
                    <Timer
                        duration={60}
                        fontColor="text-red-500"
                        onTimeUp={() => {
                            console.log("Time is up!");
                        }}
                    />
                </div>

                <div>
                    <button className="bg-red-500 px-3 py-1 text-white rounded-xl">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MockHeader;

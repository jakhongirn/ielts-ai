import React from "react";
import Timer from "../timer";


const MockHeader = () => {
    return (
        <div>
            <div className="w-full px-8 py-4 bg-white shadow-md flex justify-between fixed z-10">
                <div>
                    <h1>Examiner.uz</h1>
                </div>
                <div>
                    <Timer
                        duration={40}
                        onTimeUp={() => {
                            console.log("Time is up!");
                        }}
                        fontColor="text-green-500"
                    />
                </div>

                <div>
                    <button className="bg-green-500 px-3 py-1 text-white rounded-xl">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MockHeader;

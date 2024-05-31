import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import mockReadingData from "../data/mocktests.json";
import QuestionColumn from "../questionColumn";


type MockListeningBodyProps = {
    activePart: number;
    methods: any;
};


interface ListeningTestAudioProps {
    src: string; // Source URL of the audio file
    autoPlay: boolean; // Automatically play the audio when component mounts
}

const MockListeningBody = ({ activePart, methods }: MockListeningBodyProps) => {
    const renderQuestionPart = (partNumber: number) => {
        const partData = mockReadingData.listening.parts.find(
            (part) => part.part_number === partNumber
        );

        if (!partData) {
            return <p>Part not found.</p>;
        }

       

        return (
            <div>
                
                        <QuestionColumn methods={methods}
                            questionData={partData}
                            fontColor="text-green-500"
                        />
                    
            </div>
        );
    };

    const ListeningTestAudio: React.FC<ListeningTestAudioProps> = ({
        src,
        autoPlay,
    }) => {
        const audioRef = useRef<HTMLAudioElement>(null);

        useEffect(() => {
            const audio = audioRef.current;

            // Automatically play audio if autoPlay is true
            if (audio && autoPlay) {
                audio.play().catch((error) => {
                    console.error("Playback failed:", error);
                    // Handle playback failure (e.g., show error message to the user)
                });
            }

            return () => {
                // Ensures audio stops when the component unmounts
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            };
        }, [autoPlay]);

        return <audio ref={audioRef} src={src} preload="auto" />;
    };

    return (
        <div className="pt-16 pb-12 flex w-full h-screen">
            <ListeningTestAudio src="/mock-listening-1.mp3" autoPlay={true} />
            <div className=" border-gray-400 p-4 h-full w-full overflow-auto">
                {renderQuestionPart(activePart)}
            </div>
        </div>
    );
};
export default MockListeningBody;

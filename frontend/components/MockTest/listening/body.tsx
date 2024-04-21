import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import mockReadingData from "../data/mocktests.json";
import QuestionColumn from "../questionColumn";

const MockBody = () => {
    const [activePart, setActivePart] = useState<number>(1);
    const MockFooter = ({ fontColor }) => {
        return (
            <div className="fixed z-10 w-full py-2 text-center bottom-0 bg-gray-100 text-xl font-semibold shadow-2xl">
                {/* Tabs to switch between parts */}
                <div className="tabs flex gap-x-2 justify-between mx-4">
                    {mockReadingData.listening.parts.map((part) => (
                        <button
                            key={part.part_number}
                            onClick={() => setActivePart(part.part_number)}
                            className={`${fontColor} w-full text-center border-2 py-1 rounded-xl border-gray-300`}
                        >
                            Part {part.part_number}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderQuestionPart = (partNumber: number) => {
        const partData = mockReadingData.listening.parts.find(
            (part) => part.part_number === partNumber
        );

        if (!partData) {
            return <p>Part not found.</p>;
        }

        return (
            <QuestionColumn
                questionData={partData}
                fontColor="text-green-500"
            />
        );
    };



    interface ListeningTestAudioProps {
      src: string;  // Source URL of the audio file
      autoPlay: boolean;  // Automatically play the audio when component mounts
    }
    
    const ListeningTestAudio: React.FC<ListeningTestAudioProps> = ({ src, autoPlay }) => {
      const audioRef = useRef<HTMLAudioElement>(null);
    
      useEffect(() => {
        const audio = audioRef.current;
    
        // Automatically play audio if autoPlay is true
        if (audio && autoPlay) {
          audio.play().catch(error => {
            console.error('Playback failed:', error);
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
    
      return (
        <audio ref={audioRef} src={src} preload="auto" />
      );
    };
    
    
    
    
    

    return (
        <div className="pt-16 pb-12 flex w-full h-screen">
            <ListeningTestAudio src="/mock-listening-1.mp3" autoPlay={true}/>
            <div className=" border-gray-400 p-4 h-full w-full overflow-auto">
                {renderQuestionPart(activePart)}
            </div>
            <MockFooter fontColor="text-green-500" />
        </div>
    );
};
export default MockBody;

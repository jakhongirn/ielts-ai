import React, { useState, useRef, useEffect } from 'react';
import QuestionColumn from '../questionColumn';
import ReactPlayer from 'react-player';

type MockListeningBodyProps = {
    activePart: number;
    methods: any;
    mockTestData?: object | any;
};

interface ListeningTestAudioProps {
    src: string; // Source URL of the audio file
    autoPlay: boolean; // Automatically play the audio when component mounts
}

const MockListeningBody = ({ activePart, methods, mockTestData }: MockListeningBodyProps) => {
    const renderQuestionPart = (partNumber: number) => {
        const partData = mockTestData?.parts.find(
            (part) => part.part_number === partNumber
        );

        if (!partData) {
            return <p>Part not found.</p>;
        }

        return (
            <div>
                <QuestionColumn
                    methods={methods}
                    questionData={partData}
                    fontColor="text-green-500"
                />
            </div>
        );
    };
    const ListeningTestAudio = ({ src }) => {
        const audioRef = useRef<HTMLAudioElement>(null);
    
        return <audio ref={audioRef} src={src} preload="auto" autoPlay />;
    };
    return (
        <div className="pt-16 pb-12 flex w-full h-screen">
            <ReactPlayer url='https://mocktests.fra1.cdn.digitaloceanspaces.com/mocktest-A001/mock-listening-1.mp3' />
            <div className="border-gray-400 p-4 h-full w-full overflow-auto">
                {renderQuestionPart(activePart)}
            </div>
        </div>
    );
};

export default MockListeningBody;

import React, { useState, useRef, useEffect } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import MockBody from './body';
import MockFooter from '../footer';
import MockHeader from '../header';
import QuestionColumn from '../questionColumn';
import { UserAnswerDataType } from '@/types/mocktest';

type MockListeningBodyProps = {
    activePart: number;
    methods: any;
    mockTestData?: object | any;
};

type ListeningSectionProps = {
    submitSectionForm: (data: object) => void;
    mockTestData?: object | any;
};

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

    return (
        <div className="pt-16 pb-12 flex w-full h-screen">
            <div className="border-gray-400 p-4 h-full w-full overflow-auto">
                {renderQuestionPart(activePart)}
            </div>
        </div>
    );
};

const ListeningSection = ({ submitSectionForm, mockTestData }: ListeningSectionProps) => {
    const [activePart, setActivePart] = useState<number>(1);
    const methods = useForm<UserAnswerDataType>();
    const { handleSubmit } = methods;
    const listeningAudioSrc = mockTestData.listeningAudioSrc

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error('Playback failed:', error);
                // Handle playback failure (e.g., show error message to the user)
            });
        }
    }, []);

    const onSubmit: SubmitHandler<UserAnswerDataType> = (data) => {    
        submitSectionForm(data);
    };

    return (
        <div className="mock-test">
            <audio
                ref={audioRef}
                src={listeningAudioSrc}
                preload="auto"
                autoPlay
            />
            <FormProvider {...methods}>
                <form id="listening-form" onSubmit={handleSubmit(onSubmit)}>
                    <MockHeader
                        duration={40}
                        bgColor="bg-green-500"
                        fontColor="text-green-500"
                    />
                    <MockListeningBody mockTestData={mockTestData} methods={methods} activePart={activePart} />
                </form>
            </FormProvider>
            <MockFooter
                setActivePart={setActivePart}
                fontColor="text-green-500"
                sectionPart={mockTestData}
            />
        </div>
    );
};

export default ListeningSection;

'use client';
import React from 'react'
import MockBody from './body';
import { useState, useCallback } from 'react';
import MockFooter from '../footer';
import MockHeader from '../header';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

type ListeningSectionProps = {
  submitSectionForm: (data: object) => void;
}

type UserAnswerData = {
  [questionId: string]: string;
};

const ListeningSection = ({submitSectionForm}: ListeningSectionProps) => {
  const methods = useForm<UserAnswerData>();
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<UserAnswerData> = (data) => {
      submitSectionForm(data);
  };



  const [activePart, setActivePart] = useState<number>(1);
  return (
   <div className="mock-test">
    <FormProvider {...methods}>
                    <form id="listening-form" onSubmit={handleSubmit(onSubmit)}>
        <MockHeader duration={40} bgColor="bg-green-500" fontColor='text-green-500'/>
        <MockBody methods={methods} activePart={activePart}/>  
        <MockFooter section="listening" setActivePart={setActivePart} fontColor="text-green-500" />
        </form>
        </FormProvider>
   </div>
  )
}

export default ListeningSection;
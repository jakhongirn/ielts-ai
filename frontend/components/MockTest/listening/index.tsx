'use client';
import React from 'react'
import MockBody from './body';
import { useState, useCallback } from 'react';
import MockFooter from '../footer';
import MockHeader from '../header';

const ListeningSection = () => {
  const [activePart, setActivePart] = useState<number>(1);
  return (
   <div className="mock-test">
        <MockHeader duration={40} bgColor="bg-green-500" fontColor='text-green-500'/>
        <MockBody activePart={activePart}/>  
        <MockFooter section="listening" setActivePart={setActivePart} fontColor="text-green-500" />
   </div>
  )
}

export default ListeningSection;
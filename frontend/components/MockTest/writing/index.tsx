'use client';

import React from 'react'
import MockHeader from '../header';
import MockBody from './body';
import { useState } from 'react';
import MockFooter from '../footer';

const WritingSection = () => {
  const [activePart, setActivePart] = useState<number>(1);
  return (
   <div className="mock-test">
        <MockHeader duration={60} fontColor="text-blue-500"/>
        <MockBody activePart={activePart}/>  
        <MockFooter section="writing" fontColor="text-blue-500" setActivePart={setActivePart} />
   </div>
  )
}

export default WritingSection;
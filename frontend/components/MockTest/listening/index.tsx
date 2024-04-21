'use client';

import React from 'react'
import MockHeader from './header';
import MockBody from './body';
import { useState, useCallback } from 'react';

const ListeningSection = () => {
  return (
   <div className="mock-test">
        <MockHeader />
        <MockBody />  
        {/* <ResizableColumns /> */}
   </div>
  )
}

export default ListeningSection;
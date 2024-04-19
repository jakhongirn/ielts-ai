import React from 'react'
import MockHeader from './header';
import MockBody from './body';
import { useState, useCallback } from 'react';

const Mock = () => {
    

    const ResizableColumns = () => {
        const [leftWidth, setLeftWidth] = useState('50%'); // Initial width as a string
        const [isDragging, setIsDragging] = useState(false);
      
        const startResizing = (e) => {
          setIsDragging(true);
          // Record the starting x position of the mouse
          const startX = e.clientX;
          const startWidth = e.currentTarget.previousElementSibling.offsetWidth;
          
          const doResize = (moveEvent) => {
            const currentWidth = startWidth + moveEvent.clientX - startX;
            setLeftWidth(`${currentWidth}px`);
          };
      
          const stopResize = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', doResize);
            document.removeEventListener('mouseup', stopResize);
          };
      
          document.addEventListener('mousemove', doResize);
          document.addEventListener('mouseup', stopResize);
        };
      
        return (
          <div className="flex w-full h-screen">
            <div style={{ width: leftWidth }} className="h-full overflow-auto bg-red-200 p-4">
            left
            </div>
            <div
              onMouseDown={startResizing}
              className="cursor-col-resize bg-gray-400 w-2 h-full select-none"
            />
            <div style={{ width: `calc(100% - ${leftWidth})` }} className="h-full overflow-auto  bg-blue-200 p-4">
            right</div>
          </div>
        );
      };
      
      



  return (
   <>
        <MockHeader />
        <MockBody />  
        {/* <ResizableColumns /> */}
   </>
  )
}

export default Mock;
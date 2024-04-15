import React, { useState } from 'react';

const MockBody = () => {
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
    <div className="flex w-full">
      <div style={{ width: leftWidth }} className="p-4 border-r-2 border-gray-400">
        
        <h1 id="partNumber" className='text-2xl font-bold'>Part 1</h1>

      </div>
      <div
        onMouseDown={startResizing}
        className="cursor-col-resize  w-1.5 select-none"
      />
      <div style={{ width: `calc(100% - ${leftWidth})` }} className="border-l-2 border-gray-400 p-4">
        Right Column
      </div>
    </div>
  );
};

export default MockBody;

import React, { createRef, useState } from 'react';
import './split.css';

const Split = () => {
  const [resize, setResize] = useState(false);
  const leftPaneRef = createRef<HTMLDivElement>();
  const rightPaneRef = createRef<HTMLDivElement>();
  
  const onMouseMove = (event: any) => {
    if (!leftPaneRef.current) {
      return;
    }
    if (resize) {
      leftPaneRef.current.style.flexBasis = event.clientX + 'px';
    }
  };

  return (
    <div className='split-screen'>
      <div className='left-pane' ref={leftPaneRef}>Previous Handover</div>
      <div 
        className='splitter' 
        onMouseDown={() => setResize(true)} 
        onMouseUp={() => setResize(false)}
        onMouseMove={onMouseMove}
      />
      <div className='right-pane' ref={rightPaneRef}>Handover Form</div>
    </div>
  );
};

export default Split;
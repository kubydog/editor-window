import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { editable, maximise, visible } from './windowSlice';

const Home = () => {
  const windowMaximised = useSelector((state: RootState) => state.window.maximised);
  const open = useSelector((state: RootState) => state.window.visible);
  const edit = useSelector((state: RootState) => state.window.editable);
  const dispatch = useDispatch();
  const toggleDialog = (event: any) => {
    dispatch(visible(!open))
    dispatch(maximise());
  };

  useEffect(()=>{
    dispatch(editable(true));
  }, []);

  return (
    <div className='button-group'>
        <button className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onClick={toggleDialog}>Open Window</button>
        <button className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' disabled={windowMaximised}>Unclickable Button</button>
        {/* <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={toggleEditable}>Set Read-Only to {String(editable)}</button> */}
    </div>
  );
}

export default Home;
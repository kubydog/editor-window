import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editable } from './windowSlice';
const Settings = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(editable(false));
  }, []);
  return <p>Readonly</p>;
};

export default Settings;
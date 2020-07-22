import React from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';

const Question: React.FC = () => {
  const prompt = useSelector((state: IAppState) => state.basicState.room);
  console.log('the prompt is ', prompt);
  return (
    <div>
      <p>Question: </p>
    </div>
  );
};

export default Question;

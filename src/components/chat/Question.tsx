import React from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';
import { Prompt } from '../../actions/basicActions';

const Question: React.FC = () => {
  const prompt = useSelector((state: IAppState) => state.basicState.prompt);
  return (
    <div>
      <p>{prompt ? prompt.prompt : 'Choosing a prompt...'}</p>
    </div>
  );
};

export default Question;

import { Reducer } from 'redux';
import { BasicActionTypes, BasicActions } from '../actions/basicActions';

export interface IBasicState {
    email: string;
    username: string;
}

const initialBasicState: IBasicState = {
    email: '',
    username: '',
};

export const basicReducer: Reducer<IBasicState, BasicActions> = (
    state = initialBasicState,
    action
  ) => {
    switch (action.type) {
      case BasicActionTypes.ANY: {
        return {
          ...state,
          property: action.property
        };
      }
      case BasicActionTypes.LOGIN: {
        return {
          ...state,
          email: action.email,
          username: action.username,
        }
      }
      case BasicActionTypes.LOGOUT: {
        return initialBasicState;
        // return {
        //   ...state,
        //   email: '',
        //   username: '',
        // }
      }

      default:
        return state;
    }
  };
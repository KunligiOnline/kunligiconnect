import { Reducer } from 'redux';
import { BasicActionTypes, BasicActions } from '../actions/basicActions';

export interface IBasicState {
    email: string;
    displayName: string;
}

const initialBasicState: IBasicState = {
    email: '',
    displayName: '',
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
          displayName: action.displayName,
        }
      }
      case BasicActionTypes.LOGOUT: {
        return initialBasicState;
        // return {
        //   ...state,
        //   email: '',
        //   displayName: '',
        // }
      }

      default:
        return state;
    }
  };
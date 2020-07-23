import React from 'react';
import { configure, shallow, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../src/components/login/Login';
import { useSelector } from 'react-redux';
import { IAppState } from '../src/store/store';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IBasicState } from '../src/reducers/basicReducer'

configure({ adapter: new Adapter() });

// let wrapper: ReactWrapper;
// let store;

// const initialBasicState: IBasicState = {
//     email: '',
//     username: '',
//     userId: null,
//     socket: null,
//     chatType: '',
//     messages: [],
//     prompt: null,
//     room: null,
//   };
  
const mockStore = configureStore();

// test the login component
describe('Login Component', () => {
  it('renders Login Button', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('button').text()).toEqual('Log in')
  })

// test the sign in component
  it('renders Sign In button', () => {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('nav-link').html()).toMatch('Don\'t have an account? Sign Up')
  })

})
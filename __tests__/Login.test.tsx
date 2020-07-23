import React from 'react';
import { configure, mount, shallow, ReactWrapper, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../src/components/login/Login';
import { useSelector } from 'react-redux';
import { IAppState } from '../src/store/store';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { IBasicState } from '../src/reducers/basicReducer'

configure({ adapter: new Adapter() });

const initialBasicState: IBasicState = {
    email: '',
    username: '',
    userId: null,
    socket: null,
    chatType: '',
    messages: [],
    prompt: null,
    room: null,
  };
  
const store = configureStore();

// test the login component
describe('Login Component', () => {
  it('renders Log In Button', () => {
      const wrapper = shallow(
        <Provider store={store}>
            <Login />
        </Provider>);
    expect(wrapper.find('button').text()).toEqual('Log in')
  })

// test the sign in component
  it('renders Sign Up message', () => {
    const wrapper = shallow(
    <Provider store={store}>
        <Login />
    </Provider>);
    expect(wrapper.find('nav-link').html()).toMatch('Don\'t have an account? Sign Up')
  })

  it('snapshot matches', () => {
    const wrapper = shallow(        
    <Provider store={store}>
        <Login />
    </Provider>)
    expect(wrapper).toMatchSnapshot()
  })
})
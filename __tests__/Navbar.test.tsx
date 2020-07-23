import {
  shallow,
  mount,
  configure,
  ShallowWrapper,
  ReactWrapper,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import React, { Component } from 'react';
import Navbar from '../src/components/navigation/Navbar';
import App from '../src/App';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../src/actions/basicActions';
import { IAppState } from '../src/store/store';
// import configureStore from 'redux-mock-store';
import configureStore from '../src/store/store';
import { Provider } from 'react-redux';
import { IBasicState } from '../src/reducers/basicReducer';

configure({ adapter: new Adapter() });

let wrapper: ReactWrapper;
// let dispatch = useDispatch();
// let store;

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

// const mockStore = configureStore();
const store = configureStore();

beforeEach(() => {
  // store = mockStore(initialBasicState);
  wrapper = mount(
    <Provider store={store}>
      <Router>
        <Navbar />
      </Router>
    </Provider>
  );
});

describe('Navbar Component', () => {
  it('renders', () => {
    expect(wrapper.find('h4').html()).toMatch(/Kunligi/);
  });

  xit('renders Logout button', () => {
    // dispatch(loginAction('carlosperez', 1));
    expect(wrapper.find('Button').text()).toEqual('Logout');
  });

  xit('snapshot matches', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });
});

import { shallow, configure } from 'enzyme';
import React from 'react';
import Navbar from '../navigation/Navbar';
import { useSelector } from 'react-redux';
import { IAppState, configureStore } from '../../store/store';

describe('Navbar Component', () => {
  it('renders', () => {
    const wrapper = shallow(<Provider <Navbar/>)
    expect(wrapper.find('h2').html()).toMatch(/Kunligi/)
  })

  it('renders Sign In button', () => {
  const store = configureStore();
    const wrapper = shallow(<Provider store={store}><Navbar/> </Provider>)
    expect(wrapper.find('NavLink').text()).toEqual('Sign In')
  })

  it('snapshot matches', () => {
    const wrapper = shallow(<Navbar/>)
    expect(wrapper).toMatchSnapshot()
  })
})
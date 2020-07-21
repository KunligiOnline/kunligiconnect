import { shallow, configure } from 'enzyme';
import React from 'react';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';
import { IAppState } from '../../store/store';

// import ActionContainer from '../containers/ActionContainer';
// import { useStoreContext } from '../store';
// import { emptySnapshots } from '../actions/actions';
// import Action from '../components/Action';

describe('Navbar Component', () => {
  it('renders', () => {
    const wrapper = shallow(<Navbar/>)
    expect(wrapper.find('h1').html()).toMatch(/Hello, Enzyme/)
  })

  it('renders snapshots, too', () => {
    const wrapper = shallow(<div>
      <h1>Hello, Enzyme!</h1>
    </div>)
    expect(wrapper).toMatchSnapshot()
  })
})
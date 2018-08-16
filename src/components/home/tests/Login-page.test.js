import React from 'react';
import {shallow,mount} from 'enzyme';
import {LoginPage} from '../Login-page';

it('renders without crashing', () => {
    const mocks=jest.fn();
  const wrapper=shallow(<LoginPage  dispatch={mocks}/>);
  console.log(wrapper.debug());

});
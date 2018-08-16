import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,mount} from 'enzyme';
import {HeaderBar} from '../Header-bar';

it('renders without crashing', () => {
    const mocks=jest.fn();
  const wrapper=shallow(<HeaderBar dispatch={mocks} />);
  console.log(wrapper.debug());

});
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,mount} from 'enzyme';
import {Dashboard} from '../Dashboard-page';

it('renders without crashing', () => {
    const mocks=jest.fn();
  const wrapper=shallow(<Dashboard dispatch={mocks} />);
  console.log(wrapper.debug());

});
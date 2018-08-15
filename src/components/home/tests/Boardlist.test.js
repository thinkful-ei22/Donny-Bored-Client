import React from 'react';
import ReactDOM from 'react-dom';
import {shallow,mount} from 'enzyme';
import BoardList from '../Boardlist';

it('renders without crashing', () => {
  const wrapper=shallow(<BoardList/>);
  console.log(wrapper.debug());

});

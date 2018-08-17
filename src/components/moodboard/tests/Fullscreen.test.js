import React from 'react';
import {shallow,mount} from 'enzyme';
import {Fullscreen} from '../Fullscreen';
import {initialImages,initialIds} from '../../home/homepagedata';

it('renders without crashing', () => {
    const mocks=jest.fn();
 
 
  const wrapper=shallow(<Fullscreen  dispatch={mocks}/>);
  console.log(wrapper.debug());

});
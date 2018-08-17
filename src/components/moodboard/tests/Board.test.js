import React from 'react';
import {shallow,mount} from 'enzyme';
import {Board} from '../Board';
import {initialImages,initialIds} from '../../home/homepagedata';

it('renders without crashing', () => {
    const mocks=jest.fn();
 
 
  const wrapper=shallow(<Board  images={initialImages} imageIds={initialIds} dispatch={mocks}/>);
  console.log(wrapper.debug());

});
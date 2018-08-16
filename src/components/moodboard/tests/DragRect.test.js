import React from 'react';
import {shallow,mount} from 'enzyme';
import {DragRect} from '../DragRect';
import {initialImages,initialIds} from '../../home/homepagedata';

it('renders without crashing', () => {
    const mocks=jest.fn();
 
 
  const wrapper=shallow(<DragRect  images={initialImages} imageIds={initialIds} dispatch={mocks}/>);
  console.log(wrapper.debug());

});
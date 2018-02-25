import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Greetings from './Greetings';

// configure Enzyme adapter
configure({adapter: new Adapter()});

describe('<Greetings />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Greetings />);
  });

  it('should contain one <img /> tag', () => {
    expect(wrapper.contains(<h3>Enjoy!</h3>))
    .toEqual(true);
  });

  it('should have react version being 16+', () => {
    wrapper.setProps({reactVersion: '16+'});
    expect(wrapper.contains(<span>16+</span>))
      .toBe(true);
  });
});
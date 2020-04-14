import { shallow } from 'enzyme';
import React from 'react';
import Scheduler from '..';

describe('Index', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Scheduler />);
    expect(wrapper).toMatchSnapshot();
  });
});

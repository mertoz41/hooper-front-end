import React from 'react'
import { shallow } from 'enzyme'
import {Location} from './location'
import { Explore } from './explore'

describe('location component', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<Location />)
    })
    it('should render share location button', () =>{
         
        expect(wrapper.find('button').text()).toMatch("Share Location")
    })
    it('should render map component upon sharing location', () =>{
        const explore = shallow(<Explore />)
        const button = wrapper.find('button')
        button.simulate('click')
        expect(explore.find('div.map')).toBeDefined();

    })

})
import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router';
import {Explore} from './explore'
import Navbar from './navbar'
import Map from './map'



describe('explore component', () =>{
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<Explore />)
    })
    it('should render NavBar component', () =>{
        expect(wrapper.contains(<Navbar/>)).toBe(true)
    })
    it('should render a button to share location', () =>{
        expect(wrapper.find('button').text()).toMatch("Share Location")
    })
    it('should render Map component upon sharing location', () =>{
        const button = wrapper.find('button')
        button.simulate('click')
        expect(wrapper.find('div.map')).toBeDefined();

    })
})
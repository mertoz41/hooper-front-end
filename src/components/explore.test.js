import React from 'react'
import { shallow, mount } from 'enzyme'
import {Explore} from './explore'
import Navbar from './navbar'
import Location from './location'




describe('explore component', () =>{
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<Explore />)
    })
    it('should render NavBar component', () =>{
        expect(wrapper.contains(<Navbar/>)).toBe(true)
    })
    it('should render Location component', () =>{
        expect(wrapper.contains(<Location />)).toBe(true)
    })
})
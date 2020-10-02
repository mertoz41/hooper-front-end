import React from 'react'
import {shallow, mount} from 'enzyme'
import {Profile} from './profile'
import Navbar from './navbar'
import Profilecard from './profilecard'
import Givenfeedbacks from './givenfeedback'
import Receivedfeedbacks from './receivedfeedback'

describe('Profile component', () =>{
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<Profile />)
    })

    it('should render Navbar component', () =>{
        expect(wrapper.contains(<Navbar />)).toBe(true)
    })
    it('should render Profilecard component', () =>{
        expect(wrapper.contains(<Profilecard />)).toBe(true)
    })
    it('should render Givenfeedbacks component', () =>{
        expect(wrapper.contains(<Givenfeedbacks />)).toBe(true)
    })
    it('should render Receivedfeedbacks component', () =>{
        expect(wrapper.contains(<Receivedfeedbacks />)).toBe(true)
    })
})
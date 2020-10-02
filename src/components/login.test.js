import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router';


import Login from './login'

describe('Login component', () => {
    let wrapper
    beforeEach(() =>{
        wrapper = mount(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )
    })
    it('should render name of the app', () => {
        expect(wrapper.find('h1').text()).toMatch('Hooper App');
    })
    it('should render header', () =>{
        expect(wrapper.find("Header").text()).toMatch('Log in to your account')
    })
    it('should render login button', () =>{
        expect(wrapper.find("Button").exists()).toBe(true)
    })

})
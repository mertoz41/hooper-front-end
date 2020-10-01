import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter } from 'react-router';


import Login from './login'

describe('Login component', () => {
    it('should render name of the app', () => {
        const component = mount(
        <MemoryRouter> 
        <Login />
        </MemoryRouter> )
        expect(component.find('h1').text()).toMatch('Hooper App');
    })
    it('should render header', () =>{
        const wrapper = mount(
        <MemoryRouter>
        <Login />
        </MemoryRouter>
        )
        expect(wrapper.find("Header").text()).toMatch('Log in to your account')
    })
    it('should render login button', () =>{
        const wrapper = mount(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )
        expect(wrapper.find("Button").exists()).toBe(true)
    })

})
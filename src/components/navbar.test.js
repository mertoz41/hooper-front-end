import React from 'react'
import { shallow } from 'enzyme'
import {Navbar} from './navbar'

describe('Navbar component', () =>{
    it('should render user name on the button', () =>{
        const currentUser = {
            username: "Mert"
        }
        const wrapper = shallow(<Navbar currentUser={currentUser} />)
        const button = wrapper.find('Button.username-button');
        console.log(button.debug())
        expect(wrapper.find('Button.username-button').text()).toEqual(`${currentUser.username}`)
            
    })
})
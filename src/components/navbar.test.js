import React from 'react'
import { shallow, mount } from 'enzyme'
import {Navbar} from './navbar'

describe('Navbar component', () =>{
    let wrapper
    let currentUser
    beforeEach(() => {
        currentUser = {
            username: "Mert"
        }
        wrapper = mount(<Navbar currentUser={currentUser}/>)
    })

    it('should render the component', () =>{
        expect(wrapper.find('div.header')).toBeDefined()
    })
    it('should render username on the button', () =>{
        expect(wrapper.find('div.username').text()).toEqual(`${currentUser.username}`)   
    })
    it('should render logout button', () =>{
        expect(wrapper.find('div.logout')).toHaveLength(1)
    })
    it('should render the hoop image', () => {
        expect(wrapper.find('img')).toBeDefined()
    })
})
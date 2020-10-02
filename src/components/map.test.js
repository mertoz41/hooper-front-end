import React from 'react'
import {shallow} from 'enzyme'
import {Map} from './map'


describe('map component', () =>{
    it('should render google maps', () =>{
        const wrapper = shallow(<Map />)
        expect(wrapper.find('div')).toBeDefined();

    })
})
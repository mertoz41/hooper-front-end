import React, { Component } from 'react'
import Map from './map'
import { Tab } from 'semantic-ui-react'
import Posting from './posting'
import Posts from './posts'
import Navbar from './navbar'
import { Redirect } from 'react-router-dom';
import store from '../redux/store'
import {connect} from 'react-redux'
import Location from './location'



export class Explore extends Component {

    
   

    componentDidMount(){
        // fetch for all locations to be marked on the map.

        fetch('http://localhost:3000/locations')
        .then(resp => resp.json())
        .then(locations => {
            store.dispatch({type: "API_LOCATIONS_INCOMING", apiLocations: locations})
        })

    }
    

    selectMarker =(marker)=>{
        // function to display postings of the incoming marker.
        
        store.dispatch({type: "SELECTED_LOCATION_INCOMING", selectedLocation: marker})
    
    }

 
    
    render() {
        const panes = [
            { menuItem: 'Postings', render: () => <Tab.Pane><Posts/> </Tab.Pane> },
            { menuItem: 'Post', render: () => <Tab.Pane ><Posting/></Tab.Pane> }
          ]

     
       
        
        return(

            <div>
                <Navbar/>
                <Location /> 
             
                {this.props.currentLocation && this.props.shared ? 
                <div className="map">
                <Map selectMarker={this.selectMarker}/>
                </div>
                :
                null
                }
                {this.props.selectedLocation ? 
                <div className="info">
                    <h3>{this.props.selectedLocation.name}</h3>
                    <Tab panes={panes} />
                </div>
                : 
                null 
                }
                
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        currentLocation: state.currentLocation,
        selectedLocation: state.selectedLocation,
        shared: state.shared
    }
}

export default connect(mapStateToProps)(Explore) 
import React, { Component } from 'react'
import Map from './map'
import { Tab } from 'semantic-ui-react'
import Posting from './posting'
import Posts from './posts'
import Navbar from './navbar'
import { Redirect } from 'react-router-dom';
import Ball from '../newbball.gif'
import store from '../redux/store'
import {connect} from 'react-redux'



class Explore extends Component {

    
    state = {
        shared: false,
    }

    componentDidMount(){
        // fetch for all locations to be marked on the map.

        fetch('http://localhost:3000/locations')
        .then(resp => resp.json())
        .then(locations => {
            store.dispatch({type: "API_LOCATIONS_INCOMING", apiLocations: locations})
        })

    }
    
    getLocation = () =>{

        // function to get current users location.

        this.setState({ shared: !this.state.shared })
        navigator.geolocation.getCurrentPosition(this.showPosition)

    }

    showPosition = (position)=> {
        // function to save current users location.

        let currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        store.dispatch({type: "SHARED_LOCATION", currentLocation: currentLocation})
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
                <div className="exper">
                    experimenting
                </div>
                
                <div className="location">
                    {this.state.shared ?
                    <div class="spinning-ball">
                        <img src={Ball} width="100"/>
                    </div>
                    :
                    <div className="words">
                        <h3 className="sentence">Share your location to see events around you</h3>
                        <button onClick={this.getLocation}>Share Location</button>
                    </div>
                    }
                </div>
                {this.props.currentLocation && this.state.shared ? 
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
        selectedLocation: state.selectedLocation
    }
}

export default connect(mapStateToProps)(Explore) 
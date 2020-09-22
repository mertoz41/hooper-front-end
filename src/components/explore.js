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
        selectedLocation: null,
    }

    componentDidMount(){

        fetch('http://localhost:3000/locations')
        .then(resp => resp.json())
        .then(locations => {
            store.dispatch({type: "API_LOCATIONS_INCOMING", apiLocations: locations})
        })

    }
    
    getLocation = () =>{

        this.setState({ shared: !this.state.shared })
        navigator.geolocation.getCurrentPosition(this.showPosition)

    }

    showPosition = (position)=> {

        let currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        store.dispatch({type: "SHARED_LOCATION", currentLocation: currentLocation})
    }

    selectMarker =(marker)=>{

        let coordinates={
            lat: parseFloat(marker.latitude),
            lng: parseFloat(marker.longitude)
        }
         
        this.setState({
            selectedLocation: marker,
            currentLocation: coordinates
        })

    }

 
    
    render() {
        const panes = [
            { menuItem: 'Postings', render: () => <Tab.Pane><Posts allUsers={this.props.allUsers}  currentUser={this.props.currentUser} selectedLocationPostings={this.state.selectedLocation.postings} searchUser={this.props.searchUser}/> </Tab.Pane> },
            { menuItem: 'Post', render: () => <Tab.Pane ><Posting selectedLocation={this.state.selectedLocation} userPosting={this.userPosting} currentUser={this.props.currentUser}/></Tab.Pane> }
          ]

        if (this.props.searchedUser){
            return <Redirect to="/profile" />
        }
       
        
        return(

            <div>
                <Navbar userProfile={this.props.userProfile} clearCurrentUser={this.props.clearCurrentUser} currentUser={this.props.currentUser} clearUser={this.props.clearUser} allUsers={this.props.allUsers} searchUser={this.props.searchUser} />
                
                <div className="location">
                    {this.state.shared ?
                    <div class="spinning-ball">
                        <img src={Ball} width="100"/>
                    </div>
                    :
                    <div className="words">
                        <h3>Share your location to see events around you</h3>
                        <button onClick={this.getLocation}>Share Location</button>
                    </div>
                    }
                </div>
                {this.props.currentLocation && this.state.shared ? 
                <div className="map"><Map currentLocation={this.state.currentLocation} locations={this.state.apiLocations} selectMarker={this.selectMarker}/></div>
                :
                null
                }
                {this.state.selectedLocation ? 
                <div className="info">
                    <h3>{this.state.selectedLocation.name}</h3>
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
        currentLocation: state.currentLocation
    }
}

export default connect(mapStateToProps)(Explore) 
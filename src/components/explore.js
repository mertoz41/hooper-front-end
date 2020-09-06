import React, { Component } from 'react'
import Map from './map'
import { Tab } from 'semantic-ui-react'
import Posting from './posting'
import Posts from './posts'
import Navbar from './navbar'
import { Redirect } from 'react-router-dom';
import Ball from '../newbball.gif'



class Explore extends Component {

    
    state = {
        
        apiLocations: [],
        shared: false,
        selectedLocation: null,
        currentLocation:{
            lat: null,
            lng: null
        }

    }

    componentDidMount(){

        fetch('http://localhost:3000/locations')
        .then(resp => resp.json())
        .then(locations => {
             
            this.setState({
                apiLocations: locations
            })
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

        this.setState({
            currentLocation: currentLocation
        })

        this.props.saveSharedLocation(currentLocation)

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

    userPosting = (post) =>{

        fetch('http://localhost:3000/postings', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                posting: post
            })
        })
        .then(resp => resp.json())
        .then(posting => {
            let locations = this.state.apiLocations
            let foundLocation = locations.find(location => location.id === posting.posting.location_id) 
            foundLocation.postings.push(posting.posting)
            let index = locations.indexOf(foundLocation)
            let filteredLocations = locations.filter(location => location.id !== foundLocation.id)
            filteredLocations.splice(index, 0, foundLocation)
            this.setState({
                apiLocations: filteredLocations
            })
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
                {this.props.sessionLocation && this.state.shared ? 
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


export default Explore 
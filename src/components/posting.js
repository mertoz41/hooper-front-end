import React,{ Component } from 'react'
import { Form } from 'semantic-ui-react'
import {connect} from 'react-redux'
import store from '../redux/store'


class Posting extends Component {
    state ={
        message: "",
        location: {}
    }

  
    resetState = () =>{
        
        this.setState({
            message: "",
            location: {}
        })
    }

    fixState = (event) =>{
        // controlled form
        this.setState({
            message: event.target.value,
            location: this.props.selectedLocation
        })

    }

    preparePost = (event) =>{
        // function to send a post request for a comment on a location

        event.preventDefault()
        let post ={
            user_id: this.props.currentUser.id,
            message: this.state.message,
            location_id: this.state.location.id
        }
        
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
            let locations = this.props.apiLocations
            let foundLocation = locations.find(location => location.id === posting.posting.location_id) 
            foundLocation.postings.push(posting.posting)
            let index = locations.indexOf(foundLocation)
            let filteredLocations = locations.filter(location => location.id !== foundLocation.id)
            filteredLocations.splice(index, 0, foundLocation)
            let updatedLocations = [...filteredLocations]
            store.dispatch({type: "ADD_COMMENT_ON_LOCATION", apiLocations: updatedLocations})
          
        })

        this.resetState()

    }
    
    render(){
        return(
            <div className="tab">
                <Form onSubmit={event =>this.preparePost(event)}>
                    <Form.TextArea placeholder='Post on this location' name="message" value={this.state.message} onChange={event => this.fixState(event)} />
                    <Form.Button>Post</Form.Button>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        apiLocations: state.apiLocations,
        currentUser: state.currentUser,
        selectedLocation: state.selectedLocation
    }
}

export default connect(mapStateToProps)(Posting)
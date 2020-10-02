import React, {Component} from 'react'
import { Card, Image, Button, Comment, Form, Header} from 'semantic-ui-react'
import Navbar from './navbar'
import {connect} from 'react-redux'
import store from '../redux/store'
import Profilecard from './profilecard'
import Givenfeedbacks from './givenfeedback'
import Receivedfeedbacks from './receivedfeedback'


class Profile extends Component {

    render(){
        return(
            <div>
                <Navbar />
                <Profilecard />
                <Givenfeedbacks />
                <Receivedfeedbacks /> 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        searchedUser: state.searchedUser,
        currentUser: state.currentUser,
        allUsers: state.allUsers,
        feedbacks: state.feedbacks
    }
}

export default connect(mapStateToProps)(Profile)
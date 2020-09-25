import React, {Component} from 'react'
import { Card, Image, Button, Comment, Form, Header} from 'semantic-ui-react'
import Navbar from './navbar'
import {connect} from 'react-redux'
import store from '../redux/store'


class Profile extends Component {
    state = {
        feedback: ""
    }
    clearState = () =>{
        this.setState({feedback: ""})
    }
  

    fixState = (event) => {
        this.setState({
            feedback: event.target.value
        })
    }

    postFeedback = (event) =>{
        // function to send post request for a feedback
        event.preventDefault()
        let feedback = {
            supervisor: this.props.currentUser,
            supervisee: this.props.searchedUser,
            message: this.state.feedback
        }

        fetch('http://localhost:3000/feedbacks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feedback)
        })
        .then(resp => resp.json())
        .then(data => {
            let feedbacks = this.props.feedbacks
            let updatedFeed = [...feedbacks]

            updatedFeed.push(data)
            store.dispatch({type: "ADD_NEW_FEEDBACK", feedbacks: updatedFeed})
        })
        this.clearState()
    }

    supervisorName = (feedback) => {
        // function to get user name
        let found = this.props.allUsers.find(user => user.id === feedback.supervisor_id)
        return found.username
    }

    teacherName = (feedback) =>{
        // function to get user name
        let found = this.props.allUsers.find(user => user.id === feedback.supervisee_id)
        return found.username
    }

    feedbackPic = (feedback) =>{
        // function to get user picture 
        let found = this.props.allUsers.find(user => user.id === feedback.supervisor_id)
        return found.picture

         

    }

    postDate =(feedback) =>{
        // function to get feedback date 
         
        let date = new Date(feedback.created_at)
        let time = date.toLocaleTimeString()
        let ampm = time.split(':')[2].split(' ')[1]


        let post = time.split(':').splice(0,2).join(':')
         
        return `${post} ${ampm} - ${date.toLocaleDateString()}`
    }
 

    render(){
        return(
            <div>
                <Navbar userProfile={this.props.userProfile} clearCurrentUser={this.props.clearCurrentUser}currentUser={this.props.currentUser} clearUser={this.props.clearUser} allUsers={this.props.allUsers} searchUser={this.props.searchUser} />
                <div>
                    <Card>
                        <Image src={this.props.searchedUser.picture} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{this.props.searchedUser.username}</Card.Header>
                        </Card.Content>
                    </Card>
                </div>
                <div id="feedback-given">
                <Comment.Group>
                <Header as='h3' dividing>
                    Given feedbacks to
                </Header>
                {this.props.searchedUser.taught.length < 1 ?
                <h3>{this.props.searchedUser.username} has not given any feedbacks.</h3>
                :
                <div class="scroller-taught">
                    {this.props.searchedUser.taught.map(feedback => {
                    return(
                        <Comment>
                            <Comment.Content>
                                <Comment.Author as='a'>{this.teacherName(feedback)}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{this.postDate(feedback)}</div>
                                </Comment.Metadata>
                                <Comment.Text>{feedback.message}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    )
                })}
                </div>
            }

                </Comment.Group>

                </div>

                <div id="feedback">
                 <Comment.Group>
                    <Header as='h3' dividing>
                    Feedbacks 
                </Header>
                    {this.props.feedbacks.length < 1 ?
                    <div>Be the first to give a feedback to this hooper</div>
                    :
                    <div class="scroller-profile">
                        {this.props.feedbacks.map(feedback => {
                        return (
                            <Comment>
                                <Comment.Avatar src={this.feedbackPic(feedback)} />
                                    <Comment.Content>
                                        <Comment.Author as='a'>{this.supervisorName(feedback)}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{this.postDate(feedback)}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{feedback.message}</Comment.Text>
                                    </Comment.Content>
                            </Comment>)})}
                    </div>
                    }
                    {this.props.currentUser.id === this.props.searchedUser.id ? 
                    null
                    :
                    <Form reply onSubmit={event => this.postFeedback(event)}>
                    <Form.TextArea placeholder="Share your feedback" value={this.state.feedback} onChange={event => this.fixState(event)}/>
                    <Button content='Add Feedback' labelPosition='left' icon='edit' primary />
                    </Form>
                    }
                </Comment.Group>
                </div>

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
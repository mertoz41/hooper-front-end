import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Comment, Form, Header} from 'semantic-ui-react'
import store from '../redux/store'


export class Receivedfeedback extends Component {
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

    feedbackPic = (feedback) =>{
        // function to get user picture 
        let found = this.props.allUsers.find(user => user.id === feedback.supervisor_id)
        return found.picture
    }
    supervisorName = (feedback) => {
        // function to get user name
        let found = this.props.allUsers.find(user => user.id === feedback.supervisor_id)
        return found.username
    }
    postDate =(feedback) =>{
        // function to get feedback date 
         
        let date = new Date(feedback.created_at)
        let time = date.toLocaleTimeString()
        let ampm = time.split(':')[2].split(' ')[1]


        let post = time.split(':').splice(0,2).join(':')
         
        return `${post} ${ampm} - ${date.toLocaleDateString()}`
    }
    render() {
        return (
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
        )
    }
}
const mapStateToProps = (state) => {
    return{
        currentUser: state.currentUser,
        feedbacks: state.feedbacks,
        searchedUser: state.searchedUser,
        allUsers: state.allUsers
    }
}


export default connect(mapStateToProps)(Receivedfeedback)

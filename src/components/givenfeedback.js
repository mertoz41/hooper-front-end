import React, { Component } from 'react'
import {Comment, Header} from 'semantic-ui-react'
import {connect} from 'react-redux'


export class Givenfeedback extends Component {
    teacherName = (feedback) =>{
        // function to get user name
        let found = this.props.allUsers.find(user => user.id === feedback.supervisee_id)
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
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        searchedUser: state.searchedUser,
        allUsers: state.allUsers
    }
}

export default connect(mapStateToProps)(Givenfeedback)

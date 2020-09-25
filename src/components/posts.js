import React,{Component} from 'react'
import { Comment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import store from '../redux/store'
import { withRouter } from "react-router";



class Posts extends Component{
  
    getUsername =(posting)=>{
        // function to get username
        let found = this.props.allUsers.find(user => user.id === posting.user_id)
        return found.username
    }
    getUserPicture = (posting) =>{
        // function to get user picture
        let found = this.props.allUsers.find(user => user.id === posting.user_id)
        return found.picture
         

    }
    getPostDate =(posting) =>{
        // function to get date
         
        let date = new Date(posting.created_at)
        let time = date.toLocaleTimeString()

        let post = time.split(':').splice(0,2).join(':')
        let ampm = time.split(':')[2].split(' ')[1]

        return `${post} ${ampm} - ${date.toLocaleDateString()}`
    }
    redirect = (posting) =>{
        // function to redirect to clicked users profile 

        
        let found = this.props.allUsers.find(user => user.id === posting.user_id)

        fetch(`http://localhost:3000/users/${found.id}`)
        .then(resp => resp.json())
        .then(user => { 
          store.dispatch({type: "SEARCHED_USER", searchedUser: user})
          store.dispatch({type: "SEARCHED_USER_FEEDBACKS", feedbacks: user.taught_by})
          this.props.history.push(`/profile/${user.username}`)
        })
    }

    render(){
        
        return(
            <div>
                <div class="scroller">

                {this.props.selectedLocation.postings.length > 0 ?
                this.props.selectedLocation.postings.map(posting => 
                    <Comment.Group size='small'>
                        <Comment>
                            <Comment.Avatar as='a' src={this.getUserPicture(posting)} />
                            <Comment.Content>
                                <Comment.Author as='a' onClick={()=> this.redirect(posting)}>{this.getUsername(posting)}</Comment.Author>
                                <Comment.Metadata>
                                    <span>{this.getPostDate(posting)}</span>
                                </Comment.Metadata>
                                <Comment.Text>{posting.message}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>)
                :
                <div><p>Be the first to post</p></div>
            }
            </div>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        allUsers: state.allUsers,
        selectedLocation: state.selectedLocation
    }
}

export default connect(mapStateToProps)(withRouter(Posts)) 
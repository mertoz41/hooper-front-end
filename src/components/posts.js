import React,{Component} from 'react'
import { Comment } from 'semantic-ui-react'


class Posts extends Component{
    state = {
        allPostings: [],
        redirect: null
    }

    componentDidMount(){
        fetch('http://localhost:3000/postings')
        .then(resp => resp.json())
        .then(postings => { 
            this.setState({
                allPostings: postings
            })
            
        })
    }

    username =(posting)=>{
        let found = this.props.allUsers.find(user => user.id === posting.user_id)
        return found.username
    }
    userPicture = (posting) =>{
        let found = this.props.allUsers.find(user => user.id === posting.user_id)
        return found.picture
         

    }
    postDate =(posting) =>{
         
        let date = new Date(posting.created_at)
        let time = date.toLocaleTimeString()

        let post = time.split(':').splice(0,2).join(':')
        let ampm = time.split(':')[2].split(' ')[1]

        return `${post} ${ampm} - ${date.toLocaleDateString()}`
    }
    redirect = (posting) =>{
        let found = this.props.allUsers.find(user => user.id === posting.user_id)
        this.props.searchUser(found)
    }

    render(){
        
        return(
            <div>
                <div class="scroller">

                {this.props.selectedLocationPostings.length > 0 ?
                this.props.selectedLocationPostings.map(posting => 
                    <Comment.Group size='small'>
                        <Comment>
                            <Comment.Avatar as='a' src={this.userPicture(posting)} />
                            <Comment.Content>
                                <Comment.Author as='a' onClick={()=> this.redirect(posting)}>{this.username(posting)}</Comment.Author>
                                <Comment.Metadata>
                                    <span>{this.postDate(posting)}</span>
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

export default Posts 
import React,{ Component } from 'react'
import { Form } from 'semantic-ui-react'


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

        this.setState({
            message: event.target.value,
            location: this.props.selectedLocation
        })

    }

    preparePost = (event) =>{

        event.preventDefault()
        let post ={
            user_id: this.props.currentUser.id,
            message: this.state.message,
            location_id: this.state.location.id
        }

        this.props.userPosting(post)
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


export default Posting
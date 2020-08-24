import React,{Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon} from 'semantic-ui-react'
import { withRouter } from "react-router";




class Register extends Component {
    state = {
        username: "",
        password: "",
        picture: "",
        success: false
    }
    
    fixState = (event) =>{
        let name = event.target.name
        let value = event.target.value
        this.setState({
            [name]: value
        })
    }
    registration = (event) =>{ 
        event.preventDefault()
        let nuUser = {
            username: this.state.username,
            password: this.state.password,
            picture: this.state.picture
        }
        fetch('http://localhost:3000/users',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: nuUser
            })
        })
        .then(resp => resp.json())
        .then(resp => {
          if (resp.error){
            alert(resp.error)
          } else {
            alert("Success!")
            this.setState({
              success: true
            })
            this.props.history.push('/login')
            this.props.unregister()
          }
        })
    }
    
   

    render(){
        return(
            <div>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
    <h1>Hooper App</h1>
    <Icon.Group size='big'>
    <Icon size='big' name='basketball ball' color="orange"/>
  </Icon.Group>
      <Header as='h2' color='black' textAlign='center'>
     
        Register below
      </Header>
      <Form size='large' onSubmit={event => this.registration(event)}>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name="username" value={this.state.username} onChange={event => this.fixState(event)}/>
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name="password"
            value={this.state.password}
            onChange={event => this.fixState(event)}
          />
            <Form.Input fluid icon='id badge outline' iconPosition='left' placeholder='Picture URL' name="picture" value={this.state.picture} onChange={event=> this.fixState(event)}/>


          <Button color='orange' fluid size='large' onClick={() => this.redirect}>
            Register
          </Button>
        </Segment>
      </Form>
    </Grid.Column>
    </Grid>




            </div>

        )
    }
}

export default withRouter(Register) 
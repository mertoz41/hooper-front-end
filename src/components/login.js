import React,{Component} from "react"
import { NavLink, Redirect } from "react-router-dom"
import { withRouter } from "react-router";
import { Button, Form, Grid, Header, Image, Message, Segment, Icon} from 'semantic-ui-react'
import store from '../redux/store'

class Login extends Component {
  state = {
    username: "",
    password: ""
    }

  setEmpty = () =>{

    this.setState({
      username: "",
      password: ""
    })

  }

  fixState = (event) => {
    // controlled forms

    let name = event.target.name
    let value = event.target.value
    this.setState({ [name]: value})

  }

  

  login = (event) =>{

    // post request for user information
     
    event.preventDefault()
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(resp => resp.json())
    .then(resp => {
      
      if (resp.user_data){

        localStorage.setItem('jwt', resp.token)
        store.dispatch({type: "LOG_USER_IN", currentUser: resp.user_data})

      } else {

        alert(resp.message)
        this.setEmpty()
        
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
                    Log in to your account
                  </Header>
                  <Form size='large' onSubmit={event => this.login(event)}>
                    <Segment stacked>
                      <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' name="username" value={this.state.username} onChange={event => this.fixState(event)}/>
                      <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' value={this.state.password} onChange={event => this.fixState(event)}/>
                      <Button color='grey' fluid size='large'>
                        Login
                      </Button>
                    </Segment>
                  </Form>
                  <NavLink to="/register" exact>
                    <Message onClick={this.props.register}>
                      <strong>Sign up for an account</strong>
                    </Message>
                  </NavLink>
                </Grid.Column>
              </Grid>
            </div>
        )
    }
}


export default withRouter(Login)
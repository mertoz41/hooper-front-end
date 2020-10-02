import React,{Component} from 'react'
import { Search, Grid, Button, Icon  } from 'semantic-ui-react'
import hoop from '../hoopster.png'
import { withRouter } from "react-router";
import {connect} from 'react-redux'
import store from '../redux/store';




export class Navbar extends Component {
    state ={
        searching: "",
        hoopers: []
    }

    fixState = (event) => {
        // controlled form to display users on searchbar

        let hooper = event.target.value
        let found = this.props.allUsers.filter(user => user.username.includes(hooper))
        found = found.map(hooper => ({title: hooper.username, image: hooper.picture}))
        this.setState({
          searching: hooper,
          hoopers: found
          
    })
  }

  selectedHooper = (event) => {
    // function to find searched user
    let found = this.props.allUsers.find(user => user.username === event.target.innerText)
    this.fetchSearchedUser(found.id)
  }

  fetchSearchedUser = (id) =>{
    // function to get searched user information

    fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(user => { 
          store.dispatch({type: "SEARCHED_USER", searchedUser: user})
          store.dispatch({type: "SEARCHED_USER_FEEDBACKS", feedbacks: user.taught_by})
          this.props.history.push(`/profile/${user.username}`)
        })


  }

  redirect = () => {
    // function to redirect to explore page

    store.dispatch({type: "CLEAR_SEARCHED_USER"})
    this.props.history.push('/explore')

  }

  logout = () =>{
    // function to logout 

    store.dispatch({type: "LOG_USER_OUT"})
    localStorage.clear()
    this.props.history.push('/login')

  }

  userProfile = () => {   
    // function to redirect to logged in users profile 
    this.fetchSearchedUser(this.props.currentUser.id)
  }

    

  

    render(){
    
  

        return(
            <div id="header">
              <Grid>
                <Grid.Column width={3}>
                  <Search placeholder="Search hoopers" results={this.state.hoopers} value={this.state.searching} onResultSelect={event => this.selectedHooper(event)} onSearchChange={event => this.fixState(event)} />
                </Grid.Column>
              </Grid>
              <Grid>
                <div class="img" onClick={this.redirect}>
                  <img src={hoop} width="400"/>
                </div>
                <div className="username">
                  <div >
                  <Button className="username-button" icon labelPosition='left' onClick={this.userProfile}>
                    <Icon name='user' />

                    {this.props.currentUser.username}
                  </Button>
                  </div>
                  <Button icon labelPosition='right' onClick={this.logout}>
                    Logout 
                    <Icon name='sign out alternate' />
                  </Button>
                </div> 
              </Grid>
                    
            </div>

        )
    }
}

const mapStateToProps = (state) =>{
  return{
    currentUser: state.currentUser,
    allUsers: state.allUsers
  }
}

export default connect(mapStateToProps)(withRouter(Navbar))
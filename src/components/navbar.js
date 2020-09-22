import React,{Component} from 'react'
import { Search, Grid, Button, Icon  } from 'semantic-ui-react'
import hoop from '../hoopster.png'
import { withRouter } from "react-router";
import {connect} from 'react-redux'
import store from '../redux/store';




class Navbar extends Component {
    state ={
        searching: "",
        hoopers: []
    }

    fixState = (event) => {

        let hooper = event.target.value
        let found = this.props.allUsers.filter(user => user.username.includes(hooper))
        found = found.map(hooper => ({title: hooper.username, image: hooper.picture}))
        this.setState({
          searching: hooper,
          hoopers: found
          
    })
  }

  selectedHooper = (event) => {
    let found = this.props.allUsers.find(user => user.username === event.target.innerText)
    this.fetchSearchedUser(found.id)
  }

  fetchSearchedUser = (id) =>{

    fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(user => { 
          store.dispatch({type: "SEARCHED_USER", searchedUser: user})
          store.dispatch({type: "SEARCHED_USER_FEEDBACKS", feedbacks: user.taught_by})
          this.props.history.push(`/profile/${user.username}`)
        })


  }

  redirect = () => {

    store.dispatch({type: "CLEAR_SEARCHED_USER"})
    this.props.history.push('/explore')

  }

  logout = () =>{

    store.dispatch({type: "LOG_USER_OUT"})
    localStorage.clear()
    this.props.history.push('/login')

  }

  userProfile = () => {    
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
                <div class="username">
                  <Button icon labelPosition='left' onClick={this.userProfile}>
                    <Icon name='user' />
                      {this.props.currentUser.username}
                  </Button>
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
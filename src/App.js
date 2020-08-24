import React, { Fragment } from 'react';
import './App.css';
import Explore from './components/explore'
import Login from './components/login'
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from './components/profile'
import Register from './components/register'
import { withRouter } from "react-router"

class App extends React.Component{

  state = {
    loggedIn: false,
    allUsers: [],
    currentUser: null,
    searchedUser: null,
    feedbacks: [],
    registered: false,
    sessionLocation: null
  }


  componentDidMount(){
    this.fetchUsers()
    this.checkJwt()
    
    
  }

  checkJwt = () =>{
    if(localStorage.getItem('jwt')){
      fetch('http://localhost:3000/check', {
        method: 'GET',
        headers: {
          "Authentication": localStorage.getItem('jwt')
        }
      })
      .then(resp => resp.json())
      .then(resp => {
        this.loginUser(resp.user)
      })
    } else {
      this.props.history.push('/login')

    
    }
  }

  fetchUsers = () => {
    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(users => {
      this.setState({
        allUsers: users
      })
    })
  }



  loginUser = (user) =>{

    // place to store token in localStorage
    this.setState({
      loggedIn: true,
      currentUser: user
    })
    // this.props.history.push('/explore')
    // localStorage.setItem('lastLocation', '/explore')

  }



  searchedUser = (user) =>{
    let id = user.id

    fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(user => { 
           
          this.setState({
            searchedUser: user,
            feedbacks: user.taught_by
          })
        })

    this.props.history.push('/profile')
    localStorage.setItem('lastLocation', '/profile')
  }

  clearUser = (param) =>{
     
    this.setState({
      searchedUser: param
    })
  }

  clearCurrentUser = (param) =>{
    
    this.setState({
      searchedUser: null,
      loggedIn: false,
      currentUser: param,
      feedbacks: []
    })
    localStorage.clear()

    fetch('http://localhost:3000/users')
    .then(resp => resp.json())
    .then(users => this.setState({allUsers: users}))
  }

  addFeedback = (data) =>{
    this.setState({
      feedbacks: [...this.state.feedbacks, data]
    })
  }

  register = () =>{
    this.setState({
      registered: true
    })
  }
  unregister = () =>{
    this.fetchUsers()
    this.setState({
      registered: false 
    })
  }
  userProfile = () =>{
    let currentUser = this.state.currentUser
    // this.setState({
    //   searchedUser: currentUser
    // })
     
    this.searchedUser(currentUser)
  }

  saveSharedLocation = (coordinates) =>{
    this.setState({
      sessionLocation: coordinates
    })
  }

//  save the last path in the localstorage with each navigation

  render(){
    return(
      <Fragment>
          <Switch>
          <Route exact path="/register" render={()=>
          this.state.registered ?
          <Register unregister={this.unregister}/>
          :
          <Redirect to="/login" />
         }
          />
          {/* <Route exact path="/explore">
          <Explore checkJwt={this.checkJwt} sessionLocation={this.state.sessionLocation} saveSharedLocation={this.saveSharedLocation} userProfile={this.userProfile} clearCurrentUser={this.clearCurrentUser} clearUser={this.clearUser} currentUser={this.state.currentUser} allUsers={this.state.allUsers} searchedUser={this.state.searchedUser} searchUser={this.searchedUser}
          />
          </Route> */}
          <Route exact path="/explore" render={() => 
          this.state.currentUser ? 
          <Explore sessionLocation={this.state.sessionLocation} saveSharedLocation={this.saveSharedLocation} userProfile={this.userProfile} clearCurrentUser={this.clearCurrentUser} clearUser={this.clearUser} currentUser={this.state.currentUser} allUsers={this.state.allUsers} searchedUser={this.state.searchedUser} searchUser={this.searchedUser}
          />
          :
          <Redirect to="/login" />
          }
          
          />
          <Route exact path="/login" render={() =>
          this.state.currentUser ? 
          <Redirect to="/explore" />
          :
          <Login register={this.register}userInfo={this.loginUser} />
        }
        />
        {/* <Route exact path="/profile">
          <Profile userProfile={this.userProfile} clearCurrentUser={this.clearCurrentUser} clearUser={this.clearUser} addFeedback={this.addFeedback}feedbacks={this.state.feedbacks} searchedUser={this.state.searchedUser} currentUser={this.state.currentUser} allUsers={this.state.allUsers} searchUser={this.searchedUser}/>
        </Route> */}
        {/* <Route exact path="/profile">
        </Route> */}
          <Route exact path= '/profile' render={() =>
          this.state.searchedUser ?
          <Profile userProfile={this.userProfile} clearCurrentUser={this.clearCurrentUser} clearUser={this.clearUser} addFeedback={this.addFeedback}feedbacks={this.state.feedbacks} searchedUser={this.state.searchedUser} currentUser={this.state.currentUser} allUsers={this.state.allUsers} searchUser={this.searchedUser}/>
          :
          <Redirect to="/login" />
          }
          />
        
        
       
        </Switch>
      </Fragment>





     
    )
  }
}

 

export default withRouter(App)

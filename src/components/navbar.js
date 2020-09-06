import React,{Component} from 'react'
import { Search, Grid, Button, Icon  } from 'semantic-ui-react'
import hoop from '../hoopster.png'
import { withRouter } from "react-router";




class Navbar extends Component {
    state ={
        searching: "",
        hoopers: [],
        redirect: false
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
    localStorage.setItem('lastLocation', '/profile')
    this.props.searchUser(found)

  }

  redirect = () => {

    this.props.clearUser(null)
    localStorage.setItem('lastLocation', '/explore')
    this.props.history.push('/explore')

  }

  logout = () =>{

    this.props.clearCurrentUser(null)
    this.props.history.push('/login')

  }

  userProfile = () => {    
    this.props.userProfile()
  }

    

  

    render(){
    
  
      console.log(this.props.history.location)

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

export default withRouter(Navbar)
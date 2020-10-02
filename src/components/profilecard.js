import React, { Component } from 'react'
import { Card, Image } from 'semantic-ui-react'
import {connect} from 'react-redux'


export class Profilecard extends Component {
    render() {
        return (
            <div>
                <Card>
                        <Image src={this.props.searchedUser.picture} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{this.props.searchedUser.username}</Card.Header>
                        </Card.Content>
                </Card>
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        searchedUser: state.searchedUser
    }
}

export default connect(mapStateToProps)(Profilecard)

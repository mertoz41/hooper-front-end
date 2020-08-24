import React,{Component} from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'



class Map extends Component {
    render(){
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
            center={this.props.currentLocation}
            defaultZoom={13}
            >
                < Marker position={this.props.currentLocation}/>
                {this.props.locations.map(marker => (

                    < Marker 
                    key={marker.id}
                    position={{lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude)}}
                    onClick={() => this.props.selectMarker(marker)}
                    />
                ))}
            </GoogleMap>
        ))
        return(
            <div>
                <GoogleMapExample
                containerElement={<div style={{ height: `500px`, width: `500px`}}/> }
                mapElement={ <div style={{ height: `100%`}} /> }
                />

            </div>
        )
    }
}

export default Map
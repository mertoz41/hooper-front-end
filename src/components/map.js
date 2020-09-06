import React,{Component} from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'



class Map extends Component {
    
    render(){
        
        let iconMarker = new window.google.maps.MarkerImage(
            "https://lh3.googleusercontent.com/bECXZ2YW3j0yIEBVo92ECVqlnlbX9ldYNGrCe0Kr4VGPq-vJ9Xncwvl16uvosukVXPfV=w300",
            null, /* size is determined at runtime */
            null, /* origin is 0,0 */
            null, /* anchor is bottom center of the scaled image */
            new window.google.maps.Size(32, 32)
        );
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
            center={this.props.currentLocation}
            defaultZoom={13}
            >
                < Marker position={this.props.currentLocation} icon={iconMarker}/>
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
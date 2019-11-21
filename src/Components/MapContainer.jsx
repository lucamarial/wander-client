import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import React, { Component } from 'react'
import { Header, Card, Image, Icon } from 'semantic-ui-react'
import { getTrails } from '../Modules/trailsData'
import InfoWindowEx from './InfoWindowEx'

class MapContainer extends Component {
  state = {
    trails: [],
    errorMessage: null,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

  async componentDidMount() {
    let response = await getTrails()
    if (response.error_message) {
      this.setState({
        errorMessage: response.error_message
      })
    } else {
      this.setState({
        trails: response
      })
    }
  }

  onMapClicked = (props) => {
    if(this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      showingInfoWindow: true,
      activeMarker: marker
    })
  }

  render() {
    let trailsData = this.state.trails
    const style = {
      width: '80%',
      height: '80%',
      left: '10%',
      borderRadius: '8px',
      position: 'relative'
    }

    return (
      <>
      <center>
        <Header id='map-header'>
          Trails Around the World
        </Header>
      </center>
      <br />
        <Map 
          google={this.props.google} 
          zoom={3}
          style={style}
          center={{
            lat: 30.0131,
            lng: 10.0686
          }}
          onClick={this.onMapClicked}
        >
        {trailsData.map(trail => {
          return(
            <Marker 
              id={`trail_${trail.id}`}
              key={trail.id}
              name={trail.title}
              image={trail.image}
              city={trail.city}
              intensity={trail.intensity}
              position={{
                lat: trail.coordinates[0].latitude, 
                lng: trail.coordinates[0].longitude
              }}
              onClick={this.onMarkerClick}
            /> 
          )
        })}
          <InfoWindowEx
            options={{maxWidth: 300, maxHeight: 300}}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div style={{height: '300px'}}>
              <Card fluid className='infoCard'>
              <Image onClick={() => {this.props.history.push(`/trails/${this.state.selectedPlace.id.split('_')[1]}`)}} src={this.state.selectedPlace.image} />
              <Card.Content className='infoCardContent'>
              <Card.Header as='h3'>{this.state.selectedPlace.name}</Card.Header>
              <Card.Description>City: {this.state.selectedPlace.city}</Card.Description>
              <Card.Description>Intensity Level: {this.state.selectedPlace.intensity}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='like' />
                  12 Likes
                </a>
              </Card.Content>
              </Card>
            </div>
          </InfoWindowEx>
        </Map>
      </>
    )
  }
}

export default GoogleApiWrapper({
  apiKey:(process.env.REACT_APP_API_KEY)
})(MapContainer)
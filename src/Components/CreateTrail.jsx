import React, { Component } from 'react'
import CreateTrailForm from './CreateTrailForm'
import { submitTrail } from '../Modules/trailsData'

class CreateTrail extends Component {
  state = {
    title: '',
    description: '',
    extra: '',
    location: '',
    duration: '',
    intensity: 1,
    image: '',
    responseMessage: '',
    errorMessage: '',
    coordinates: []
  }

  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onAvatarDropHandler = (pictureFiles, pictureDataURLs) => {
    this.setState({
      image: pictureDataURLs
    })
  }

  dropMarkerHandler = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat()
    const lng = clickEvent.latLng.lng()
    const trailsCopy = [...this.state.coordinates]
    trailsCopy.push({latitude: lat, longitude: lng})
    this.setState({coordinates: trailsCopy})
  }

  submitTrailHandler = async () => {
    const { title, description, extra, location, duration, intensity, image, coordinates } = this.state
    let response = await submitTrail(title, description, extra, location, duration, intensity, image, coordinates)

    if (response.error_message) {
      this.setState({
        errorMessage: response.error_message
      })
    } else {
      this.setState({
        responseMessage: response
      })
    }
  }

  render() {
    let trailForm
    let responseMessage
    let errorMessage

    if (this.state.responseMessage) {
      responseMessage = <p id='response-message'>{this.state.responseMessage}</p>
    } 
    
    if (this.state.errorMessage) {
      errorMessage = <p id='error-message'>{this.state.errorMessage}</p>
    }

    trailForm = (
      <CreateTrailForm 
        intensity={this.state.intensity}
        inputHandler={this.inputHandler}
        submitTrailHandler={this.submitTrailHandler}
        onAvatarDropHandler={this.onAvatarDropHandler}
        dropMarkerHandler={this.dropMarkerHandler}
      />
    )

    return (
      <>
        {trailForm} 
        {responseMessage}
        {errorMessage}
      </>
    )
  }
}

export default CreateTrail
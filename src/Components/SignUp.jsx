import React, { Component } from 'react'
import { registerUser } from '../state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'
import SignUpForm from './SignUpForm'
import { Container, Message } from 'semantic-ui-react'

class SignUp extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
    errorMessage: ''
  }

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignup = () => {
    const { registerUser } = this.props;
    const { email, name, password, password_confirmation } = this.state;
    registerUser({ email, name, password, password_confirmation })
      .then(
        () => {if (this.props.currentUser.isSignedIn) {
          this.props.history.push('/')
        }}
      )
      .catch(error => {
        this.setState({errorMessage: error.response.data.errors})
      })
  }

  render() {
    let errorMessage

    if (this.state.errorMessage) {
      errorMessage = <Message compact id="error-message">{this.state.errorMessage}</Message>
    }

    return(
      <Container>
        <SignUpForm 
          handleSignup={this.handleSignup}
          inputChangeHandler={this.inputChangeHandler}
        />
        {errorMessage}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

const mapDispatchToProps = {
  registerUser
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
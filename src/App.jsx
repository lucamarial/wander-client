import React from 'react'
import { Route, Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { connect } from 'react-redux'
import LandingPage from './Components/LandingPage'
import SpecificTrail from './Components/SpecificTrail'
import CreateTrail from './Components/CreateTrail'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import MapContainer from './Components/MapContainer';
import SearchResults from './Components/SearchResults'
import ProfilePage from './Components/ProfilePage'

const history = createBrowserHistory({})

const App = () => {
  return (
    <Router history={history}>
      <>
        <Navbar />
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/trails/:id' component={SpecificTrail}/>
        <Route exact path='/create' component={CreateTrail}/>
        <Route exact path='/search' component={SearchResults}/>
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/map' component={MapContainer}/>
        <Route exact path='/user/:name' component={ProfilePage}/>
      </>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps
)(App)
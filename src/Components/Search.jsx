import React, { Component } from "react"
import { Menu, Input, Icon } from "semantic-ui-react"
import { withRouter } from "react-router-dom"
import { searchTrail, getTrails } from "../Modules/trailsData"

class Search extends Component {
  state = {
    trails: [],
    query: "",
    errorMessage: "",
    searchResults: []
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

  inputChangeHandler = e => {
    let currentList = []
    let newList = []

    if(e.target.value !== '') {
      debugger
      currentList = this.props.trails
      newList = currentList.filter(trail => {
        const lc = trail.toString().toLowerCase()
        const filter = e.target.value.toLowerCase()
        return lc.includes(filter)
      })
    } else {
      newList = this.props.trails
    }

    this.setState({
      searchResults: newList
    })
  }

  // getSearchResults = async () => {
  //   const { query } = this.state
  //   if (this.state.query.length < 3) {
  //     this.setState({
  //       errorMessage: 'Please input more than two characters.'
  //     })
  //   } else {
  //     let response = await searchTrail(query)
  //     if (response.error_message) {
  //       this.setState({
  //         errorMessage: response.error_message
  //       })
  //     } else {
  //       this.props.history.push("/search", { searchResults: response })
  //     }
  //   }
  // }

  render() {
    let search, errorMessage

    if (this.state.errorMessage) {
      errorMessage = <p id="search-error">{this.state.errorMessage}</p>
    }

    search = (
      <Menu.Item id="nav-search">
        <Input
          id="search-input"
          placeholder="Search..."
          name="query"
          onChange={this.inputChangeHandler}
        />
        <Icon
          id="search-submit"
          name="search"
          onClick={this.getSearchResults}
        />
      </Menu.Item>
    )

    return (
      <>
        {search}
        {errorMessage}
      </>
    )
  }
}

export default withRouter(Search)

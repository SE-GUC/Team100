import React, { Component } from "react"
//import axios from "axios"
import axios from "../../axiosInstance"
class SearchTool extends Component {
  state = {
    // name: "",
    achievements: [],
    announcements: [],
    faqs: [],
    events: [],
    albums: [],
    clubs: []
  }

  handleChange = event => {
    this.setState({ name: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios.get(`search/${this.state.name}`).then(res => {
      const body = res.data
      console.log(body)
      this.setState({
        achievements: body.Achievements,
        announcements: body.Announcements,
        faqs: body.FAQs,
        events: body.Events,
        albums: body.Albums,
        clubs: body.Clubs
      })

      console.log(this.state)
    })
  }

  render() {
    const announcementsJSX = this.state.announcements.map(announcement => {
      return (
        <div key={announcement._id}>
          <p>
            <strong>{announcement["created_by"]}</strong>
            {announcement.description}
          </p>
        </div>
      )
    })
    const eventsJSX = this.state.events.map(event => {
      return (
        <div key={event._id}>
          <p>
            <strong>{event["name_event"]}</strong>
            {event.description}
          </p>
        </div>
      )
    })

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Search </button>
        </form>
        {this.state.announcements.length > 0 ? (
          <div>
            <div>
              <h1>Announcements</h1>
              {announcementsJSX}
            </div>
          </div>
        ) : null}
        {this.state.events.length > 0 ? (
          <div>
            <div>
              <h1>Events</h1>
              {eventsJSX}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default SearchTool

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
        // albums: body.Albums,
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
    const achievementsJSX = this.state.achievements.map(achievement => {
      return (
        <div key={achievement._id}>
          <p>
            <strong>{achievement["description"]}</strong>
          </p>
        </div>
      )
    })
    const faqsJSX = this.state.faqs.map(faq => {
      return (
        <div key={faq._id}>
          <p>
            {/* <strong>{faq["created_by"]}</strong> */}
            {faq.question}
            {faq.answer}
          </p>
        </div>
      )
    })
    const clubsJSX = this.state.clubs.map(club => {
      return (
        <div key={club._id}>
          <p>
            <strong>{club["name"]}</strong>
            {club.brief_description}
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
        {this.state.achievements.length > 0 ? (
          <div>
            <div>
              <h1>Achievements</h1>
              {achievementsJSX}
            </div>
          </div>
        ) : null}
        {this.state.faqs.length > 0 ? (
          <div>
            <div>
              <h1>faqs</h1>
              {faqsJSX}
            </div>
          </div>
        ) : null}
        {this.state.clubs.length > 0 ? (
          <div>
            <div>
              <h1>Club</h1>
              {clubsJSX}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default SearchTool

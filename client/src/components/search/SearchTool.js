import React, { Component } from "react"
import axios from "../../axiosInstance"
//import { isNull } from "util";
import { Form, Button } from 'react-bootstrap';

class SearchTool extends Component {
  state = {
    achievements: [],
    announcements: [],
    faqs: [],
    events: [],
    albums: [],
    clubs: [],
    x: ""
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
        clubs: body.Clubs,
        x: "",
      })
      console.log(this.state)
    })

    if (this.state.achievements.length +
      this.state.faqs.length +
      this.state.announcements.length +
      this.state.events.length +
      this.state.clubs.length === 0)
      this.setState({ x: "Sorry we cannot find what you are looking for" })

  }

  render() {
    const announcementsJSX = this.state.announcements.map(announcement => {
      return (
        <div key={announcement._id}>
          <p>
            <strong>{announcement["title"] + ":"}</strong>
            {announcement.description}. Created by:
            {announcement.created_by}
          </p>
        </div>
      )
    })
    const eventsJSX = this.state.events.map(event => {
      return (
        <div key={event._id}>
          <p>
            <strong>{event["name_event"] + ":"}</strong>
            {event.description}. The event is created by:
            {event.club}
          </p>
        </div>
      )
    })
    const achievementsJSX = this.state.achievements.map(achievement => {
      return (
        <div key={achievement._id}>
          <p>
            <strong>Achievement post by MUN : </strong>
            {achievement["description"]}
          </p>
        </div>
      )
    })
    const faqsJSX = this.state.faqs.map(faq => {
      return (
        <div key={faq._id}>
          <p>
            <strong>Q: </strong> {faq.question}
            <strong>A: </strong> {faq.answer}
          </p>
        </div>
      )
    })
    const clubsJSX = this.state.clubs.map(club => {
      return (
        <div key={club._id}>
          <p>
            <strong>{club["name"]}:</strong>
            {club.brief_description}
          </p>
        </div>
      )
    })

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <input type="text" name="name" onChange={this.handleChange} />
          <Button type="submit" variant="outline-success">Search</Button>
        </Form>

        <div>
          <h1> </h1>
          {this.state.x}
        </div>
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
              <h1>Faqs</h1>
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

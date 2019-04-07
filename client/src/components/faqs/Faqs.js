import React, { Component } from 'react';
import axios from '../../axiosInstance';
import Collapsible from "react-collapsible";


class Faqs extends Component {
  constructor() {
    super();
    this.state = {
      faqs: [],
      question: "",
      answer: ""
    };
  }

  componentDidMount() {
    this.refreshFaqs();
    this.getFaqs();
  }

  /////
  getFaqs() {
    fetch("/api/FAQs").then(res => res.json()).then(faqs => {
      this.setState({ faqs: faqs.data });
    })
  }
  /////
  handleChangeQ = faqs => {
    this.setState({ question: faqs.target.value });
  };
  handleChangeA = faqs => {
    this.setState({ answer: faqs.target.value });
  };


  refreshFaqs() {

    fetch("/api/faqs")
      .then(res => res.json())
      .then(faqs => {
        this.setState({ faqs: faqs.data });
      });
  }
  handleChangeQuestion = faq => {
    this.setState({ question: faq.target.value });
  };
  handleChangeAnswer = faq => {
    this.setState({ question: faq.target.value });
  };
  handleSubmit = async faq => {
    faq.preventDefault();
    const updatedFaq = {
      question: faq.target.question.value,
      answer: faq.target.answer.value
    };
    console.log(updatedFaq);
    try {
      await axios.put(`faqs/${faq.target.getAttribute("data-index")}`, updatedFaq);
      this.refreshFaqs();
    }
    catch (error) {
      console.log(error);
    }
  };

  onDelete = e => {
    // console.log(e.target.getAttribute("data-index"))
    fetch(`/api/faqs/${e.target.getAttribute("data-index")}`, {
      method: "DELETE"
    }).then(res => this.refreshFaqs());
  };

  handleS = async Faqs => {
    Faqs.preventDefault();

    const faq = {
      question: this.state.question,
      answer: this.state.answer,
    };
    console.log(faq);
    try {
      await axios.post(`FAQs/`, faq);
      this.refreshFaqs();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h2>FAQS</h2>
        {
          <ul>
            {this.state.faqs.map(faq => (
              <div key={faq._id}>
                <li>
                  {faq.question} {faq.answer}
                </li>
                <button onClick={this.onDelete} data-index={faq._id}>
                  DELETE
                </button>
                <form onSubmit={this.handleSubmit} data-index={faq._id}>
                  Q:<input type="text" name="question" defaultValue={faq.question} />
                  A:<input type="text" name="answer" defaultValue={faq.answer} />
                  <input type="submit" value="Submit" />
                </form>
              </div>
            ))}
          </ul>
        }

        {this.state.faqs.map(f => (
          <div key={f._id}>
            <li>
              <label> Question: </label>
              {f.question},
              <label> Answer: </label>
              {f.answer}
            </li>
          </div>))}


        <Collapsible trigger="Create a FAQ">
          <form onSubmit={this.handleS}>
            <label>
              Question:
              <input
                type="text"
                name="Question"
                onChange={this.handleChangeQ}
              />
            </label>
            <label>
              Answer:
              <input
                type="text"
                name="Answer"
                onChange={this.handleChangeA}
              />
            </label>
            <button type="submit">Add</button>
          </form>
        </Collapsible>
      </div>
    );
  }
}

export default Faqs;

import React, { Component } from 'react';
import axios from '../../axiosInstance';
//import Collapsible from "react-collapsible";


class Faqs extends Component {
  constructor() {
    super ();
    this.state = {
      faqs:[],
      question:"",
      answer:""
    };
  }
  componentDidMount() {
    this.refreshFaqs();
  }

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
    }
    catch (error){
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
                <form onSubmit={this.handleSubmit} data-index={faq._id}>
                  Q:<input type="text" name="question" defaultValue={faq.question}/>
                  A:<input type="text" name="answer" defaultValue={faq.answer}/>
                  <input type="submit" value="Submit" />
                </form>
              </div>
            ))}
     </ul>
   }
  </div>
 );
}
}

export default Faqs;

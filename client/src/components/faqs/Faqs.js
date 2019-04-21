import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Collapsible from "react-collapsible";
import axios from '../../axiosInstance';
import "./Faqs.css";
import { Grid } from '@material-ui/core';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

import {
  InputGroup,
  Dropdown,
  Modal,
  ModalTitle,
  ModalBody,
  FormControl,
  ModalFooter
} from "react-bootstrap";

const styles = {
  card: {
    display:'inline-block',
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 25,
  },
  pos: {
    marginBottom: 12,
  },
};




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
    this.getFaqs();
    this.refreshFaqs();

  }

  /////
  getFaqs() {
    axios.get("faqs/")
      .then(res => {
        console.log(res.data)
        this.setState({
          faqs: res.data.data
        })
      })
  }

  refreshFaqs() {

    axios.get("faqs/")
      .then(res => {
        console.log(res.data)
        this.setState({
        })
      });
  }
  /////
  handleChangeQ = faqs => {
    this.setState({ question: faqs.target.value });
  };
  handleChangeA = faqs => {
    this.setState({ answer: faqs.target.value });
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
    axios
      .delete("http://localhost:5000/api/faqs/" +
        e.target.getAttribute("data-index")
      )
      .then(
        res => {
          console.log();
          this.refreshFaqs();
        }
      )
      .catch(err => console.log(err))
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
    const { classes } = this.props;
    const { spacing } = this.state;

    return (

      <div>
        <h1>FAQS</h1>
        <br/>
        <br/>

        <Grid container className={classes.root} spacing={40}>
        <Grid container className={classes.demo} justify="center" spacing={16}>

            {this.state.faqs.map(faq => (

        <Card className={Card} display='inline-block'>
          <CardContent>
              <div key={faq._id}>
              <Typography variant="body1" color="textSecondary" gutterBottom>
              {faq.question}
              </Typography>
              <Typography component="p">
              {faq.answer}
         </Typography>
         </div>
         </CardContent>
         <CardActions>
         <Fab color="primary" aria-label="Delete">
                <Button onClick={this.onDelete} data-index={faq._id}>
                <DeleteIcon/>
                  </Button>
                  </Fab>
                <form onSubmit={this.handleSubmit} data-index={faq._id}>
                  Q:<input type="text" name="question" defaultValue={faq.question} />
                  A:<input type="text" name="answer" defaultValue={faq.answer} />
                  <input type="submit" value="Edit"/>
                </form>
                </CardActions>
                </Card>

            ))}
                        </Grid>

            </Grid>
        <br/>
        <br/>

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
            <Button type="submit">
            <CheckCircle/>
            </Button>
          </form>
        </Collapsible>
 </div>
    )}}
    Faqs.propTypes = {
      classes: PropTypes.object.isRequired,
    };    
export default withStyles(styles)(Faqs);

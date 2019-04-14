import React, { Component } from "react";
import CardGroup from 'react-bootstrap/Card'
import Card from 'react-bootstrap/Card'
import { Grid,Tooltip,IconButton,Typography, Paper, FormLabel, RadioGroup, FormControlLabel,Radio, CardContent,CardActions,Button, AppBar, Tabs, Tab, TabContainer } from '@material-ui/core';
import axios from '../../axiosInstance';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Collapsible from "react-collapsible";


const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };
  

//import MunHeader from "./components/layout/MunHeader";
class EXECUTIVE extends Component{


    
    state ={
        committee:[],
        open:false
      }
    componentDidMount(){
   //   this.refreshCommittees();
      axios.get("http://localhost:5000/api/committee/5cb1e6e5c863c13bd8d08523")
      .then(res=>{
        console.log(res.data)
        this.setState({
          committee: res.data.data
        })
      })
    
      
    }


      handleChangeName= c => {
        this.setState({ name: c.target.value });
      };
      handleChangedescription = c => {
        this.setState({ description: c.target.value });
      };

      handleClickOpen = () => {
        this.setState({ open: true });
      };
      
      handleClose = () => {
        this.setState({ open: false });
      };

      handleSubmit = async c => {
        c.preventDefault();
        const updatedCommittee = {
          name: c.target.name.value,
          description: c.target.description.value
        };
        console.log(updatedCommittee);
        try {
          await axios.put(`committee/${c.target.getAttribute("data-index")}`, updatedCommittee);
          this.refreshCommittees();
        }
        catch (error) {
          console.log(error);
        }
      };


    render(){
        
        const {committee}=this.state;
        const committeeName = committee.name
        const committeeDesc = committee.description
        const committeePage = committee.page
        const committeeEvents= committee.events
        const committeeMemb = committee.team_members
       
       
        return(
            <div className="container">
            <h1 color="#003255" className="center">Executive Office</h1>

            <Link
      component="button"
      variant="body1"
     
    >

      {committeePage}
    </Link>


    <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="headline" color="primary">Description</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {committeeDesc}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="headline" color="primary" >Team Members</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
       {committeeMemb}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="headline" color="primary">Events</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Typography>
                {committeeEvents}
            </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
            
      <form onSubmit={this.handleSubmit} data-index={committee.id}>
                  Name: <input type="text" name="name" defaultValue={committee.name} />
                  Description:<input type="text" name="description" defaultValue={committee.description} />
                  Page:<input type="text" name="page" defaultValue={committee.page} />
                  Events:<input type="text" name="events" defaultValue={committee.events} />
                  <br />
                  Team Members:<input type="text" name="team_members" defaultValue={committee.team_members} />
                  <br />
                  <input type="submit" value="Update" />
                </form>
      

               


            </div>

            
            )
         
  
    }
}
export default EXECUTIVE




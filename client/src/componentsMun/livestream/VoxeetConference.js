
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import thunkMidleware from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { ConferenceRoom, reducer as voxeetReducer } from '@voxeet/react-components'
import '@voxeet/react-components/dist/voxeet-react-components.css';

class VoxeetConference extends Component {

 handleOnConnect() {
   console.log("Current user is connected to a conference")
 }

 componentDidMount() {
   const settings = {
     conferenceAlias: this.props.conferenceName,
     consumerKey: 'OXMzdmpnbDczcG9v',
     consumerSecret: 'MjkxaTM0MzVhbTFqazA4NHYwOTRncHNua2k='
   }
   const reducers = combineReducers({
     voxeet: voxeetReducer
   });
   const configureStore = () => createStore(
     reducers,
     applyMiddleware(thunkMidleware)
   )
   const voxeetUserInfo = {
     name: this.props.userName,
     externalId: this.props.externalId,
     avatarUrl: this.props.photoURL
   }
   ReactDOM.render(
     <Provider store={configureStore()}>
       <ConferenceRoom
         autoJoin // This props allow the conference room to automatically join the conference when the ConferenceRoom is mount
         userInfo={voxeetUserInfo} // Set the user info of the current user
         //isAdmin={true} // Set the current admin, this give to the current user some right if activated (Kick people, kick everybody when hangup, is the speak of the webinar mode)
           //isWebinar={true} // This props is for activate the webinar mode, only one person can speak (the admin, you can define who's the admin with the isAdmin props, just below)
           //kickOnHangup={true} // If the admin leave the conference, everybody will be kicked from the conference (the admin is define by isAdmin)
           //isManualKickAllowed={true} // If the admin click on the small cross next to a participant, this participant will be kicked from the conference (the admin is define by isAdmin)
         // handleOnConnect={this.props.handleOnLeave} // This function is called when the current user join the conference
         handleOnLeave={this.props.handleOnLeave} // This function is called when the current user leave the conference, usefull to reset state or redirect
         isWidget={true} // Set true if you want to use the widget mode (on the right side), if false, you will have a full screen experience of the conference kit
         // isModal={true} // Set true to use the widget in modal mode
         consumerKey={settings.consumerKey} // Your consumerKey get in our developer portal
         consumerSecret={settings.consumerSecret} // Your consumerSecret get in our developer portal
         conferenceAlias={settings.conferenceAlias} // The conference alias that you want to join
         /* You can find more informations inside the npm readme here : https://www.npmjs.com/package/@voxeet/react-components */
       />
     </Provider>,
     document.getElementById('voxeet-widget')
   )
 }

 render() {
   return (
     <div id="voxeet-widget">
     </div>
   )
 }
}

VoxeetConference.propTypes = {
   conferenceName: PropTypes.string,
   userName: PropTypes.string,
   externalId: PropTypes.string,
   handleOnLeave: PropTypes.func.isRequired
}

VoxeetConference.defaultProps = {
   conferenceName: 'conference_name',
   userName: 'Guest ' + Math.floor((Math.random() * 100) + 1)
}

export default VoxeetConference;


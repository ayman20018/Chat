import React from 'react';
import './navbar.css';
import Profile from './Profile.js';
import NewChat from './NewChat.js';
import Main from './MainPage.js';
import {BrowserRouter as Router,Link,Switch} from 'react-router-dom';
import { Route ,useHistory} from "react-router";
import firebase from 'firebase/app';
import { auth } from './ConnectPage';



export default function Navbar() {
    const history = useHistory()
    document.querySelector(document).ready(function(){
      document.querySelector(".menu-button").click(function(){
      document.querySelector(".menu-bar").classList.toggle( "open" );
      })
      })
    return(
        <Router>
<Switch>
<Route path='/Profile' component={Profile} />
<Route path='/CreateChat' component={NewChat} />
<Route path='/Chats' component={Main} />
<ul class="menu">

      <li title="home"><a href="#" class="menu-button home">menu</a></li>
      
      <li title="about"><a href="#" class="active about">Profile</a></li>
    </ul>
    
    <ul class="menu-bar">
        <li><a href="#" class="menu-button">Menu</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Friends</a></li>
        <li><a href="#">Groups</a></li>
        <li><a href="#">Create Group Chat</a></li>
    </ul>
<user id="user">
  <section>
    <img src={auth.currentUser.photoURL} />
    <section>
      <name value={firebase.auth().currentUser.displayName}></name>
      <actions><a href="#settings">settings</a> | <a onClick={() => {auth.signOut()
        history.push('/Login')}}>logout</a></actions>
    </section>
  </section>
  
</user></Switch>
</Router>
    )
}
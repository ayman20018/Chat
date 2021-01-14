import React, { useEffect, useState }  from "react"
import firebase from 'firebase/app';
import Profile from './Profile.js';
import NewChat from './NewChat.js';
import PrivateChat from './PrivateChats.js'
import './navbar.css'
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import {BrowserRouter as Router,Link,Switch} from 'react-router-dom';
import { Route ,useHistory} from "react-router";
import Main from './GroupChats.js';


const ChatRoom = () => {
  useEffect(()=>{
    document.getElementById('openMenu').addEventListener('click',()=>{
      var list = document.querySelectorAll(".openz")
      if(list.length === 0) {
        document.getElementById('opened').classList.add('openz')
      } else {document.getElementById('opened').classList.remove('openz')}
    })
  },[])
  const history = useHistory()
  const auth = firebase.auth();
  const [pic,setPic] = useState('')
  useEffect(()=>{
      setPic(auth.currentUser.photoURL)
  })
    return(
    <>
<Router>
<Switch>
<Route path='/Profile' component={Profile} />
<Route path='/CreateChat' component={NewChat} />
<Route path='/Chats' component={Main} />
<div>
<ul class="menu">

<li title="home"><a class="menu-button home" id='openMenu'>menu</a></li>
<Link to='/Profile'>
<li title="about"><a class="active about">Profile</a></li>
</Link>
</ul>

<ul class="menu-bar" id='opened'>
  <li><a class="menu-button">Menu</a></li>
  <li><Link to='/Profile'><a>Profile</a></Link></li>
  <li><Link to='/Friends'><a>Friends</a></Link></li>
  <li><Link to='/Chats'><a>Groups</a></Link></li>
  <li><Link to='/CreateChat'><a>Create Chat</a></Link></li>
  <li><a onClick={()=>{
    auth.signOut()
    history.push('/Login')
  }} href="">Log Out</a></li>
</ul>
        </div>
        </Switch>
        </Router>
    </>
    
    )
  }

export default ChatRoom;
import firebase from 'firebase/app';
import React, { useState } from "react"
import app from './firebaseConnect.js';

export const auth = app.auth()


export default function Login() {
    const [logIn,setLogIn] = useState(true)
    const accountNotice = () => {
      setLogIn(false)
    }
    const accountNotice1 = () => {
      setLogIn(true)
    }
      let accountChoice;
      let show;
      if (logIn === true) {
        accountChoice = (<><form class='logs' > 
          <input type="text" id="login" class="fadeIn second" name="email" placeholder="email" ></input>
          <input type="password" id="password" class="fadeIn third" name="password" placeholder="password" ></input>
          <input type='Submit' onClick={
            async event => {
              const email = document.getElementById('login').value;
              const password = document.getElementById('password').value;
              event.preventDefault();
              try {
                await app
                  .auth()
                  .signInWithEmailAndPassword(email, password);
              } catch (error) {
                alert(error);
              }
            }
          } class="fadeIn fourth" value="Log In"></input>
        </form></>)
      } else {accountChoice = <form class='logs'>
        <input type="text" id="email" class="fadeIn second" name="login" placeholder="email"></input>
        <input type="password" id="password" class="fadeIn third" name="login" placeholder="password"></input>
        <input type="text" id="first" class="fadeIn third" name="login" placeholder="First Name" ></input>
        <input type="text" id="last" class="fadeIn third" name="login" placeholder="Last Name"></input>
        <input type="text" id="username" class="fadeIn third" name="login" placeholder="UserName"></input>
        <input type='Submit' onClick={
          async event => {       
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const username = document.getElementById('username').value;
            const FirstName = document.getElementById('first').value;
            const LastName = document.getElementById('last').value;
            event.preventDefault();
            try {
              await app
                .auth()
                .createUserWithEmailAndPassword(email, password);
                firebase.firestore().collection('Users').doc(username).set({
                  firstName: FirstName,
                  lastName: LastName,
                  username:username,
                  email:email,
                  profilePic: 'https://cdn0.iconfinder.com/data/icons/basic-ui-element-s94-2/64/Basic_UI_Icon_Pack_-_Outline_user-512.png'
                })
                auth.currentUser.updateProfile({
                  displayName:username,
                  photoURL:'https://cdn0.iconfinder.com/data/icons/basic-ui-element-s94-2/64/Basic_UI_Icon_Pack_-_Outline_user-512.png'
                })
                console.log(username)
            } catch (error) {
            }

          }
        } class="fadeIn fourth" value="Sign Up"></input>
      </form>}
      show=(<>
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <h2 onClick={accountNotice1} onMouseOver={() => {document.getElementById('signin').style.cursor='pointer'}} id='signin' class="active"> Sign In </h2>
          <h2 onClick={accountNotice} onMouseOver={() => {document.getElementById('signup').style.cursor='pointer'}} id='signup' class="inactive underlineHover">Sign Up </h2>
          {accountChoice}
    </div>
  </div>
      </>)
  
      return (    
        show
      )
    }
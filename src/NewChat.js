import React, { useState } from 'react';
import 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import { useHistory } from 'react-router-dom';
import ChatRoom from './ChatApp.js';


const firestore =  firebase.firestore();

export default function NewChat() {
  const [src,setSRC] = useState(false);
  
  const UploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await baseConvert(file)
    setSRC(base64)
    console.log(base64)
  }

  const baseConvert = (file) => {
    return new Promise((resolve,revoke)=>{

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = (()=>{
        resolve(fileReader.result)
      })

      fileReader.onerror = ((error)=>{
        revoke(error)
      })
    })
  }
  const history = useHistory()

  let page = (<div>
    <ChatRoom />
    <div class="signupSection">
    <form class="signupForm" name="signupform">
    <li id='PPicon'>
    <img id='icon3' alt='' src={src}></img>
    <input type='file' id='inputfile' onChange={UploadImage}></input>
    </li>
      <h2 id='createChat'>New</h2>
      <ul class="noBullet">
        <li>
          <label for="Name"></label><br></br>
          <input type="text" placeholder='Chat' class="inputFields" id="ChatName" minLength='8' required></input>
        </li>
        <li>
            <label for="Id"></label><br></br>
            <input placeholder='Subject' class="inputFields" id="Subject" required></input>
        </li>
        <li id="center-btn">
          <input type='button' onClick={()=>{
              const usersRef = firestore.collection('GroupChats').doc('2R95ie8IYvVAcdbI9rrc').collection('Text').doc('OUlIbZENMbF6j6u85cdF').collection('GroupName').doc(document.getElementById('ChatName').value.toLowerCase())
              usersRef.get()
                .then((docSnapshot) => {
                  if (docSnapshot.exists) {
                      alert('Group already exists');
                  } else {
                    usersRef.set({
                    GroupChat: document.getElementById('ChatName').value.toLowerCase(),
                    Subject: document.getElementById('Subject').value.toLowerCase(),
                    PhotoURL: document.getElementById('icon3').src})
                    history.push('/Chats')
                    }
              });
            }
          } value='Create'></input>
        </li>
      </ul>
    </form>
  </div></div>)
        return(page)}
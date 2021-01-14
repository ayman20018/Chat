import React , {useState} from 'react';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/storage';
import { auth } from './ConnectPage';
import ChatRoom from './ChatApp.js'


const storage = firebase.storage()

function Profile(){
  const [user,setUser] = useState('')
  const [username,setusername] = useState('')
  const [test,setTest] = useState('')
  const[displayName,setDisplayName] = useState('')
  const [URL,setURL] = useState(firebase.auth().currentUser.photoURL)
      const UploadImage = async (e) => {
        const file = e.target.files[0];
        const final = window.URL.createObjectURL(file)
        setURL(final)
        setTest(file)
      }
      const handleUpload = () => {
        const uploadTask = storage.ref(`images/${test.name}`).put(test);
        uploadTask.on('state_changed', 
        (snapshot) => {
        }, 
        (error) => {
          console.log(error);
        }, 
      () => {
        setDisplayName(document.getElementById('username').value)
          storage.ref('images').child(test.name).getDownloadURL().then(url => {
              setURL(url)
              firebase.firestore().collection('Users').doc(auth.currentUser.displayName).update({
                username: document.getElementById('username').value,
                profilePic: url
              })
              auth.currentUser.updateProfile({
                photoURL: url
              })
              console.log(url)
          })
      })
                alert('Account updated succesfully')
    }
    const cityRef = firebase.firestore().collection('Users').doc(auth.currentUser.displayName);
    cityRef.get().then(doc=>{
      setUser(doc.data().firstName+' '+doc.data().lastName)
      setusername(doc.data().username)
    })
    console.log(username)
    
      return (<>
      <div>
        <div class="signupSection">
        <div class="info">
        <img id='icon' alt='' src={URL}></img>
        <input type='file' onChange={UploadImage}></input>
        </div>
        <form class="signupForm" name="signupform">
          <h2>My Profile</h2>
          <ul class="noBullet">
          <li>
            <div>
              <input type="text" class="inputFields" id="first" placeholder='Name' Value={user} disabled></input>
            </div>
              <input type="text" class="inputFields" id="username" placeholder='UserName' defaultValue={username} required></input>
              <input type="email" class="inputFields" id="email" placeholder='email'  defaultValue={firebase.auth().currentUser.email} disabled required></input>
            </li>
            <li id="center-btn">
            <input type='button' value='SAVE' onClick={handleUpload}></input>
            </li>
          </ul>
        </form>
        </div>
        </div>
        </>
  )}
export default Profile;
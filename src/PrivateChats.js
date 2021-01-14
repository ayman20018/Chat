import React, { useState,useEffect} from "react"
import 'firebase/firestore'; 
import './ChatList.css'
import 'firebase/auth';
import 'firebase/analytics';
import './bubblemessage.css';
import ChatRoom from './ChatApp.js'
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';



const firestore =  firebase.firestore();
const auth = firebase.auth();

export default function PrivateChat() {  
        function ChatMessage(props) {
        const { text, uid } = props.message;
         
        const messageClass = uid === auth.currentUser.uid ? 'sent bubble me' : 'received bubble you';
        const messageClasss = uid === auth.currentUser.uid ? 'bubble me' : 'bubble you';
      
        return (<>
          <div id='textyo' className={`message ${messageClass}`}>
            <p className={messageClasss}>{text}</p>
          </div>
        </>)
      }
      const [UserName,setUserName] = useState([])
      const [UserList,setUserList] = useState([])
      const [Pal,setPal] = useState('')
      const [friends,setfriends] = useState([])
      const [Refs,setRefs] = useState(auth.currentUser.displayName+' Bot')
      const [reverse,setReverse] = useState('Bot '+auth.currentUser.displayName)
    useEffect(()=>{
    firestore.collection('Users').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
         UserList.push(
          doc.id,
          )
        });
      }
      )
    },[])
    const handleChange = async(e) =>{
      const str = e.target.id.split(' ')
      setRefs(str[0]+' '+str[1])
      setReverse(str[1]+' '+str[0])
      console.log(str[1])
      await firestore.collection('Users').doc(str[1]).get().then((docSnapshot) => {
        const username = docSnapshot.data().username
        setPal(username)
      })
      console.log(Pal)
   }
   useEffect(()=>{
    UserList.forEach((user)=>{
      firestore.collection('Users').doc(user).get().then((docSnapshot) => {
        const username = docSnapshot.data().username
        UserName.push(username)
      })
    })
    for (let i = 0;i<=UserList.length;i++) {
     const chat = auth.currentUser.displayName+' '+UserList[i]
    firestore.collection('PrivateChats').doc('Chats').collection(chat).doc('chat').get().then((docSnapshot) => {
    if (docSnapshot.exists) {
          friends.push(chat)}})
 }})


        const messageRefs = firestore.collection('PrivateChats').doc('Chats').collection(Refs);
        const query = messageRefs.orderBy('CreatedAt');
        const [messages] = useCollectionData(query, {idField: 'id'})

        const messageRefs1 = firestore.collection('PrivateChats').doc('Chats').collection(reverse);
          
          const [FormValue, setFormValue] = useState('');
          
          const sendMessage = async (e) => {
            e.preventDefault();
            
        
            const { uid } = auth.currentUser;
      
            
            await messageRefs.add({
              text: FormValue,
              CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              uid,
            })
            await messageRefs1.add({
              text: FormValue,
              CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              uid
            })
            setFormValue('');
            firestore.collection('PrivateChats').doc('Chats').collection(Refs).doc('chat').set({
              YES:'true'
            })
            firestore.collection('PrivateChats').doc('Chats').collection(reverse).doc('chat').set({
              YES:'true'
            })
          }
          function Search() {
            friends.forEach((user)=>{
              const input = document.getElementById('input').value

              for (let i=0;i<=UserName.length;i++) {
                firestore.collection('Users').doc(UserList[i]).get().then((docSnapshot) => {
                  if(UserName[i] === input) {
                  console.log(UserName[i])
                  const friende = docSnapshot.data().username
                  const Image = docSnapshot.data().profilePic
            let li = document.createElement('li')
            let img = document.createElement('img')
            let group = document.createElement('span')  
            li.setAttribute('id',auth.currentUser.displayName +' '+ UserList[i])
            li.classList.add('list-group-item')
            img.setAttribute('id',auth.currentUser.displayName +' '+ UserList[i])
            img.classList.add('GroupIMG')
            group.setAttribute('id',auth.currentUser.displayName +' '+ UserList[i])
            group.textContent = friende
            img.src = Image
            console.log(friends)
            li.appendChild(img)
            li.appendChild(group)
            li.addEventListener('click',handleChange)
      
            document.querySelector('#chatlist').appendChild(li)
                }})
            }

            })            }  
            useEffect(()=>{
              let timeout;
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                friends.forEach((friend)=>{
                  
                  let li = document.createElement('li')
              let img = document.createElement('img')
              let group = document.createElement('span')  
              const str = friend.split(' ')
                firestore.collection('Users').doc(str[1]).get().then((docSnapshot) => {
                  const friend = docSnapshot.data().username
                  const Image = docSnapshot.data().profilePic
                  li.setAttribute('id',auth.currentUser.displayName+' '+str[1])
                  li.classList.add('list-group-item')
                  img.setAttribute('id',auth.currentUser.displayName+' '+str[1])
                  img.classList.add('GroupIMG')
                  group.setAttribute('id',auth.currentUser.displayName+' '+friend)
                  group.textContent = friend
                  img.src = Image
  
  
                  li.appendChild(img)
                  li.appendChild(group)
                  li.addEventListener('click',handleChange)
        
              document.querySelector('#chatlist').appendChild(li)
              console.log(friends[i])
                })
            })},1000)},[])
            var btns = document.getElementsByClassName("list-group-item");
            for (var i = 0; i < btns.length; i++) {
              btns[i].addEventListener("click", function() {
              var current = document.getElementsByClassName(" active");
              if (current.length > 0) { 
                current[0].className.replace("active",' ');
              }
              this.className+=" active";
              });
            }
              
          
            return (<>
              <ChatRoom />
            <div>
              <div id='chatpage'>
              <div class="col">
                <ul id='chatlist' class="options list-group" >
                  <li>
                    <input id='input' type="text" placeholder="Look for a friend ..." onChange={Search}></input>
                  </li>
                </ul>
              </div> 
              <div id='messagesForm'>
              <div id='messages'>
              <div class="top"><span>To: <span class="name" >{Pal}</span></span></div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
              </div>
              <form class='write' onSubmit={sendMessage}>
                <input id='MessageText' type='text' value={FormValue} onChange={(e) => setFormValue(e.target.value)} required></input>
                
                <input type='submit'  class="write-link" value=' '></input>
              </form>
              </div>
              </div>
              </div>
              </>)
        }
import React, { useState,useEffect} from "react"
import 'firebase/firestore'; 
import './ChatList.css'
import 'firebase/auth';
import 'firebase/analytics';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore =  firebase.firestore();
const auth = firebase.auth();


function Main(props) {
  
  let [GroupChat,setGroupChat] = useState('main')
  const handleChange =(e) =>{
    setGroupChat(e.target.id)
 }
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
    const messageRefs = firestore.collection('GroupChats').doc('2R95ie8IYvVAcdbI9rrc').collection('Text').doc('OUlIbZENMbF6j6u85cdF').collection(GroupChat ||'main');
    const query = messageRefs.orderBy('CreatedAt');
    const [messages] = useCollectionData(query, {idField: 'id'})

  
    const [FormValue, setFormValue] = useState('');
    
    const sendMessage = async (e) => {
      e.preventDefault();
      
  
      const { uid } = auth.currentUser;

      
      await messageRefs.add({
        text: FormValue,
        CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
      })
      setFormValue('');
    }
    function renderList(doc) {
      let li = document.createElement('li')
      let img = document.createElement('img')
      let group = document.createElement('span')

      li.setAttribute('id',doc.id)
      li.classList.add('list-group-item')
      img.setAttribute('id',doc.id)
      img.src = doc.data().PhotoURL
      img.classList.add('GroupIMG')
      group.setAttribute('id',doc.id)
      group.textContent = doc.data().GroupChat
      
  
      li.appendChild(img)
      li.appendChild(group)
      li.addEventListener('click',handleChange)

      document.querySelector('#chatlist').appendChild(li)
  }
  useEffect(() => {
      firestore.collection('GroupChats').doc('2R95ie8IYvVAcdbI9rrc').collection('Text').doc('OUlIbZENMbF6j6u85cdF').collection('GroupName').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
         renderList(doc)
        });
      })
    }, [])
    var btns = document.getElementsByClassName("list-group-item");
            for (var i = 0; i < btns.length; i++) {
              btns[i].addEventListener("click", function() {
              var current = document.getElementsByClassName("active");
              if (current.length > 0) { 
                current[0].className = current[0].className.replace(" active", "");
              }
              this.className+=" active";
              });
            }
      return (
        <>
        <div id='chatpage'>
        <div class="col">
          <ul id='chatlist' class="options list-group" >
          </ul>
        </div> 
        <div id='messagesForm'>
        <div id='messages'>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
        </div>
        <form class='write' onSubmit={sendMessage}>
            <input id='MessageText' type='text' value={FormValue} onChange={(e) => setFormValue(e.target.value)} required></input>
            <input type='submit'  class="write-link" value=' '></input>
        </form>
        </div>
        </div></>)
  }
export default Main;
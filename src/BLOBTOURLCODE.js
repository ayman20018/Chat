const base64 = await baseConvert(file)
SetUpload(base64)

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

const [ImageProfile,SetImageProfile] = useState('')
firebase.firestore().collection('Users').doc('UserInfo').collection(firebase.auth().currentUser.uid).get().then(snapshot => {
    snapshot.forEach(doc => {
     const image = doc.data().ProfilePic
     SetImageProfile(image)
    });
  })

  const [upload,SetUpload] = useState('')
  firebase.firestore().collection('Users').doc('UserInfo').collection(firebase.auth().currentUser.uid).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
    const PPP=doc.data().ProfilePic;
    SetUpload(PPP)
  });})


  clearTimeout(timeout);
          timeout = setTimeout(() => {}

            friends.forEach((friend)=>{}
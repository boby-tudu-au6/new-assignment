import React,{useState,useEffect} from 'react'
import * as firebase from 'firebase/app'
import {config} from './config'
import 'firebase/auth'
function App() {
	if (!firebase.apps.length) {
		firebase.initializeApp(config);
	 }
	 const [user,setUser] = useState({})
  useEffect(()=>{
	  firebase.auth().onAuthStateChanged(user=>{
		if (user) {
			console.log({
				displayName : user.displayName,
				email : user.email,
				emailVerified : user.emailVerified,
				photoURL : user.photoURL,
				isAnonymous : user.isAnonymous,
				uid : user.uid,
				providerData : user.providerData
			})
			setUser({
				displayName : user.displayName,
				email : user.email,
				emailVerified : user.emailVerified,
				photoURL : user.photoURL,
				isAnonymous : user.isAnonymous,
				uid : user.uid,
				providerData : user.providerData
			})
		}
	  })
	
	  
  },[firebase.auth().currentUser])
  
  const handleSubmit = e =>{
    e.preventDefault()
	const {email,pass} = e.target
	console.log(email.value,pass.value)
	firebase.auth().createUserWithEmailAndPassword(email.value, pass.value)
	.then(()=>{
		const user = firebase.auth().currentUser
		user.sendEmailVerification()
		.then(()=>console.log("email sent"))
		.catch(err=>console.log(err.message))
	})
    .catch(err=>console.log(err.message))
  }
  const handleLogin = e =>{
	  e.preventDefault()
	  const {email,pass} = e.target
	  console.log(email.value,pass.value)
		firebase.auth().signInWithEmailAndPassword(email.value, pass.value)
		.then(()=>console.log("login done"))
		.catch(err=>console.log(err.message))
  }
  const updateProfile = e =>{
	  e.preventDefault()
	  const {name} = e.target
	  const user = firebase.auth().currentUser
	  user.updateProfile({
		displayName: name.value,
		photoURL: "https://example.com/jane-q-user/profile.jpg"
	  })
	  .then(()=>console.log('update done'))
  }
  const signout = () =>{
	  firebase.auth().signOut()
	  .then(()=>setUser({}))
  }
  return (
    <div>
      <form method='post' onSubmit={handleSubmit}>
        <input type='email' name='email' />
        <input type='password' name='pass' />
        <button type='submit'>Register</button>
      </form><br/>
      <form method='post' onSubmit={handleLogin}>
        <input type='email' name='email' />
        <input type='password' name='pass' />
        <button type='submit'>Login</button>
      </form><br/>
	  <form method='post' onSubmit={updateProfile}>
		  <input type='text' name='name' />
		  <input type='submit' value="update" />
	  </form><br/>
	  <button onClick={signout}>Sign out</button>
	  <pre>
		  {JSON.stringify(user,null,2)}
	  </pre>
    </div>
  )
}

export default App

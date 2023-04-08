import React, { useEffect, useState } from 'react'
import { auth } from '../Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import '../App.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Homepage from './Homepage'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../Firebase'


const Auth = () => {

    const [err, seterr] = useState(false)
    const [showlogin, setshowlogin] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>
    {
      setshowlogin(false)
    },[])

    const handalesubmit = async (e) =>
    {
    e.preventDefault()
    
    const displayname = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    
      try 
      {
       await createUserWithEmailAndPassword(auth, email, password)
       await setDoc(doc(db, "users", displayname), {
        email: email,
        password: password,
      });
        
      }catch(err)
      {
        console.log(err)
        seterr(true)
      }
    
    }
    

    const handalesubmit1 = async (e) =>
    {
    e.preventDefault()
    
    const displayname = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    
      try 
      {
         await signInWithEmailAndPassword(auth, email, password)
         console.log("succeed")
        navigate('/home')
        sessionStorage["username"] = displayname;
      }catch(err)
      {
        console.log(err)
        seterr(true)
      }
    
    }
    

  return (
    <div>
      <br/>
{
  !showlogin &&
    <div className='form'>
    <h3 className='subtitle'>Do You Want To Sigh Up?</h3>
    <form onSubmit={handalesubmit}>
    <input type='text' placeholder='UserName'/><br/>
    <input type='email' placeholder='Email' /><br/>
    <input type='password' placeholder='Password' /><br/>
    <button className='submit'>Sign Up</button>
    {err && <span>something wrong</span>}
    </form>

    <p>do you have an account?</p>
    <button onClick={() => {setshowlogin(true)}} >Move To Log in</button>
  </div>
}
  {/* <br/><br/><br/> */}
{
showlogin && 

  <div className='form'>
    <button onClick={() => setshowlogin(false)}>Back To Sign Up</button>
<h3 className='subtitle'>Log-In</h3>    
    <form onSubmit={handalesubmit1}>
    <input type='text' placeholder='username' /> <br/>
    <input type='email' placeholder='Email' /> <br/>
    <input type='password' placeholder='Password' /><br/>
    <button className='submit'>Log In</button>
    {err && <span>One of the options is incorrectly Please try again</span>}
    </form>    
  </div>
}


    </div>
  )
}

export default Auth
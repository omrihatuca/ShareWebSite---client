import React from 'react'
import '../App.css'
import Auth from './Auth'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Homepage from './Homepage'
import Chatpage from './Chatpage'
const Main = () => {

const navigate = useNavigate()

  return (
    <div className='App'>
<h1>Welcome To Share</h1>
<div style={{float : "right"}}>
<button onClick={() => navigate('/')}>Log Out</button>
</div>
<br/><br/>
<Routes>
<Route path='/' element={<Auth />} />
  <Route path='home' element={<Homepage />} />
  <Route path='chat/:id' element={<Chatpage />} />
</Routes>

    </div>
  )
}

export default Main
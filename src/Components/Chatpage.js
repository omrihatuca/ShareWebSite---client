import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'
import ScrollToBottom from 'react-scroll-to-bottom'
import io from 'socket.io-client'
import { addDoc,serverTimestamp, collection } from "firebase/firestore"; 
import { db } from '../Firebase'


const socket = io.connect("http://localhost:8000");

const Chatpage = (props) => {

  const params = useParams()
  const [cuurentmes , setcurrentmes] = useState("")
    const [messageList, setMessageList] = useState([]);
    const navigate = useNavigate()


const messagedata = collection(db,"messages");

    const sendmessege = async () =>
    {
        if (cuurentmes !=="")
         {
            const mesdata = 
            {
                roomname : params.id,
                username : sessionStorage["username"],
                message : cuurentmes,
                time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message" , mesdata)
            await addDoc(messagedata, {
              user : sessionStorage["username"],
              room : params.id,
              message : cuurentmes,
              time : serverTimestamp()
            })

            setMessageList((list) => [...list, mesdata]);
            setcurrentmes("");
            console.log(mesdata)
        }
    };

    useEffect(()=>
    {
      socket.emit("join_room", params.id)
       socket.on("recive_message", (data1)=>
        {
            setMessageList((list) => [...list, data1]);
            console.log(data1)
        })

       


    },[props.socket])


  return (
    <div>
<br/><br/>
    <div className='chat-window'>
    <div className="chat-header">
        <p>Share Live</p>
    </div>
    
    <div className="chat-body">
    <ScrollToBottom className="message-container">
          {messageList.map((x,index) => {
            return (
              <div key={index}
                className="message"
                id={sessionStorage["username"] === x.username ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{x.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{x.time}</p>
                    <p id="username">{x.username}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>


    <div className="chat-footer">
    <input type={'text'} placeholder="text.."  value={cuurentmes} onChange={(e) => setcurrentmes(e.target.value)} 
         onKeyPress={(event) => {
            event.key === "Enter" && sendmessege();
          }} />
        <button onClick={sendmessege}>&#9658;</button>
    </div>


    </div>
    
    <br/><br/>
    <button onClick={() => navigate('/home')}>Back To Home</button>
    </div>
  )
}

export default Chatpage
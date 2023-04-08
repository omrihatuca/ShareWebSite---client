import React, { useEffect, useState } from 'react'
import {app, db} from '../Firebase'
import { collection, getDocs } from "firebase/firestore";
import Homepagedata from './Homepagedata';
const Homepage = () => {

const [rooms, setromms] = useState([])


useEffect(()=>
{
  const getrooms = async () =>
  {
    const rom = await getDocs(collection(db, "rooms"));
    let roomsdata = []

    rom.forEach(doc => 
    {
      let obj = {id : doc.id, subject : doc.data().subject, subs : doc.data().subs,};
        roomsdata.push(obj)
    });

    setromms(roomsdata)
    console.log(roomsdata)
    

  }
getrooms()


},[])

  return (
    <div>
      <br/>
   <div>
{
  rooms.map((x,index)=>
  {
    return <Homepagedata data={x} key={index} />
  })
}
   </div>
   <br/>
    </div>
  )
}

export default Homepage
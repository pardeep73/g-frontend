import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Apidata, Apiget, burl } from './Apihandler/Apihandler';
const Chats = ({chatend,setid}) => {

  const [data,setdata] = useState([]);
  const dataFetch = async () => {
    try {
        const response = await fetch(`${burl}/api/bot/chats`, {
            method: 'POST',
            credentials: 'include', // Ensures cookies are sent
            headers: {
                'Content-Type': 'application/json', // Specify content type if needed
            },
            body: JSON.stringify({}), // Add payload if required
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Index Response', data);
        setdata(data.chats); // Update state with the chats data

        
    } catch (error) {
        console.log('Error while fetching in the index', error);
    }
};



useEffect(() => {
  dataFetch();
}, [chatend.chatend.getprop]);
/* console.log('i am from Chats',chatend.chatend.getprop) */



  return (
   <>
   <nav id='nav'>
      
      {data?.map((element) => {
        return(
          <div className='box' key={element._id} onClick={()=>{
            chatend.chatend.setid(element._id);
          }}>
                
            <div className='query'>

              {element.question+"?"}
            </div>
            </div>
        )
            
}) || 'No chats'}
       
   </nav>
   </>
  )

  
}

export default Chats
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Apidata, Apiget, burl } from './Apihandler/Apihandler';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const Chats = ({ chatend, setid }) => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
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

  const logout = async () => {
    try {
      const response = await fetch(`${burl}/api/user/logout`, {
        method: 'POST',
        credentials: 'include', // Ensures cookies are sent
        headers: {
          'Content-Type': 'application/json', // Specify content type if needed
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success === true) {
        toast.success(data.message);
        setTimeout(() => {
          navigate('/')
        }, 2000);
      }

    } catch (error) {
      console.log('Error while fetching in the index', error);
    }
  };


  return (
    <>
      <nav id='nav'>
        <div className="logout-btn">
        <Link onClick={logout}>Logout</Link>
        </div>
        <div className="all-chats">

          {data?.map((element) => {
            return (
              <div className='box' key={element._id} onClick={() => {
                chatend.chatend.setid(element._id);
              }}>

                <div className='query'>

                  {element.question + "?"}
                </div>

              </div>
            )

          }) || 'No chats'}

        </div>


      </nav>
      <ToastContainer/>
    </>
  )


}

export default Chats
import logo from './logo.svg';
import './App.css';
import Index from './Layout/Index';
import reportWebVitals from './reportWebVitals.js';
import Chats from './Layout/Chats.js';
import Master from './Layout/Master.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './Layout/Login.js';
import Register from './Layout/Register.js'
import Header from './Layout/Header.js';
import UserMaster from './Layout/UserMaster.js';
function App() {
  /* reportWebVitals(console.log); */
  /* console.log('i am from app', chatend) */


  const [getprop, sendprop] = useState(false);
  const [id, setid] = useState('')


  useEffect(() => {
    console.log('getprop changed', getprop)
    sendprop(false)
  }, [getprop])
  useEffect(() => {
    console.log('id prop changed', id)
  }, [id])

  return (
    <>
      <BrowserRouter>
        <Routes>

        
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>


          <Route path='/home' element={<Master chatend={{ getprop, setid }} />}>
            <Route path='' element={<Index setend={{ sendprop, id }} />} />
          </Route>
        </Routes> 
      </BrowserRouter>
    </>
  );
}


export default App;

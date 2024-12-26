
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Apidata, burl } from './Apihandler/Apihandler'
import { SpinnerInfinity, SpinnerRoundFilled } from 'spinners-react'
import { Toastify } from 'toastify'
import { toast, ToastContainer } from 'react-toastify'
const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState()

    const[api,setapi]=useState('')
    const navigate = useNavigate();

    const data = {
        email,
        password
    }
   const handle = async (event) => {
    setloading(true)
    event.preventDefault();

    try {
        if (!email || !password) {
            toast.warn('Please Fill the All Fields');
            setloading(false)
            return;
        }

        const response = await fetch(`${burl}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for cookies
            body: JSON.stringify(data),
        });

        const resData = await response.json();

        console.log("Register Response data", resData);

        setapi(resData);
        toast.success(resData.message);

        if (resData.success === true) {
            setTimeout(() => {
                navigate('/home');
                setloading(false)
            }, 2000);
        }
    } catch (error) {
        console.log("Problem in Register try block", error);
        setloading(false)
    }
    
};
    return (
        <>
            <div className='main'>
                <form className='register' >
                    <div className="contain">

                        <h2>CHAT BOT</h2>
                        <div className="inputs">
                            
                            <input type="email" placeholder='Email' onChange={(event) => {

                                setemail(event.target.value)

                            }} value={email} />
                           <div className="password">
                                <input type="password" placeholder='Password' id='password' onChange={(event) => {

                                    setpassword(event.target.value)
                                }} value={password} />

                                <div className="show" id='show'></div>
                            </div>
                        </div>
                        <div className="acc">
                            <Link to={'/'}>Create a new account?</Link>
                        </div>
                        <button onClick={handle}>Login {loading && <SpinnerRoundFilled size={50} thickness={100} speed={100} color={'silver'} secondarycolor={"rgba(0, 0, 0, 0.44)"} />}</button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </>
        
    )
}

export default Login
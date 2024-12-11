import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SpinnerRoundFilled } from "spinners-react";
import { Apidata, burl } from './Apihandler/Apihandler'
import { showhide } from '../javascript/navcontent'


const Register = () => {

    const navigate = useNavigate();
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
<<<<<<< HEAD

    const [api, setapi] = useState('')
=======
     const [loading, setloading] = useState()
    const[api,setapi]=useState('')
>>>>>>> f7d231a2b78f3856397469abb16ce798b91e63d6


    const data = {
        username,
        email,
        password
    }

<<<<<<< HEAD
    const handleRegister = async (event) => {
=======
    const handleRegister = async(event) =>{
         setloading(true)
>>>>>>> f7d231a2b78f3856397469abb16ce798b91e63d6
        event.preventDefault();

        try {

            if (!username || !email || !password) {
                alert('Please Fill the All Fields');
            }

            await axios.post(`${burl}/api/user/register`, data)
                .then((res) => {
                    console.log("Register Response data", res.data)
                    setapi(res.data)
                    alert(res.data.message)
                    if (res.data.success === true) {
                        setTimeout(() => {
                            navigate('/login')
                        }, 2000);
                    }
                })
                .catch((error) => {
                    console.log("Error while Fetching the Register Response", error)
                })
        } catch (error) {
<<<<<<< HEAD
            console.log("Problem in Register try block", error)
        }
=======
            console.log("Problem in Register try block",error)
        }finally{
        setloading(false)
    }
>>>>>>> f7d231a2b78f3856397469abb16ce798b91e63d6
    }

   
    return (
        <>
            <div className='main'>
                <form action="" className='register'>
                    <div className="contain">

                        <h2>CHAT BOT</h2>
                        <div className="inputs">
                            <input type="text" placeholder='Username' onChange={(event) => {
                                setusername(event.target.value)
                            }} value={username} />
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
                            <Link to={'/login'}>Already have an account?</Link>
                        </div>
                        <button onClick={handleRegister}>Create account{loading && <SpinnerRoundFilled size={50} thickness={100} speed={100} color={'silver'} secondarycolor={"rgba(0, 0, 0, 0.44)"} />}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register

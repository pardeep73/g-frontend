import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Apidata, burl } from './Apihandler/Apihandler'
import { showhide } from '../javascript/navcontent'
import { SpinnerRoundFilled } from 'spinners-react'
import { toast, ToastContainer } from 'react-toastify'


const Register = () => {

    const navigate = useNavigate();
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false);

    const [api, setapi] = useState('')


    const data = {
        username,
        email,
        password
    }

    const handleRegister = async (event) => {
        event.preventDefault();
        setloading(true)

        try {

            if (!username || !email || !password) {
                toast.warn('Please Fill the All Fields');
            }

            await axios.post(`${burl}/api/user/register`, data)
                .then((res) => {
                    console.log("Register Response data", res.data)
                    if (res.data.success === true) {
                        setapi(res.data)
                        toast.success(res.data.message)
                        setTimeout(() => {
                            navigate('/login')
                            setloading(false);
                        }, 2000);
                    }
                    else {
                        toast.warn(res.data.message)
                        setloading(false);
                    }
                })
                .catch((error) => {
                    console.log("Error while Fetching the Register Response", error);
                    setloading(false);
                })
        } catch (error) {
            console.log("Problem in Register try block", error);
            setloading(false);
        }
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
            <ToastContainer/>
        </>
    )
}

export default Register
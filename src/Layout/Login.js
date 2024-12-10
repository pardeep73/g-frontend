
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Apidata, burl } from './Apihandler/Apihandler'
const Login = () => {


    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')


    const[api,setapi]=useState('')
    const navigate = useNavigate();

    const data = {
        email,
        password
    }

    const handle = async(event) =>{
        event.preventDefault();

        try {

            if(!email || !password){
                alert('Please Fill the All Fields');
            }

            await axios.post(`${burl}/api/user/login`,data,
                {
                    withCredentials: true,
                }
            )
            .then((res)=>{
                console.log("Register Response data",res.data)
                setapi(res.data)
                alert(res.data.message)
                if(res.data.success === true){
                setTimeout(() => {
                    navigate('/home')
                }, 2000);
            }
            })
            .catch((error)=>{
                console.log("Error while Fetching the Register Response",error)
            })
        } catch (error) {
            console.log("Problem in Register try block",error)
        }
    }
   /*  console.log(' data from login',api) */


    return (
        <>
            <div className='main'>
                <form className='register'>
                    <div className="contain">

                        <h2>CHAT BOT</h2>
                        <div className="inputs">
                            
                            <input type="email" placeholder='Email' onChange={(event) => {

                                setemail(event.target.value)

                            }} value={email} />
                            <input type="text" placeholder='Password' onChange={(event) => {

                                setpassword(event.target.value)
                            }} value={password} />
                        </div>
                        <div className="acc">
                            <Link to={'/'}>Create a new account?</Link>
                        </div>
                        <button onClick={handle}>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
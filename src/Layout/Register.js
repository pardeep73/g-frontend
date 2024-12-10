import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Apidata, burl } from './Apihandler/Apihandler'


const Register = () => {

    const navigate = useNavigate();
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const[api,setapi]=useState('')


    const data = {
        username,
        email,
        password
    }

    const handleRegister = async(event) =>{
        event.preventDefault();

        try {

            if(!username || !email || !password){
                alert('Please Fill the All Fields');
            }

            await axios.post(`${burl}/api/user/register`,data)
            .then((res)=>{
                console.log("Register Response data",res.data)
                setapi(res.data)
                alert(res.data.message)
                if(res.data.success ===true){
                setTimeout(() => {
                    navigate('/login')
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
                            <input type="text" placeholder='Password' onChange={(event) => {

                                setpassword(event.target.value)
                            }} value={password} />
                        </div>
                        <div className="acc">
                            <Link to={'/login'}>Already have an account?</Link>
                        </div>
                        <button onClick={handleRegister}>Create account</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
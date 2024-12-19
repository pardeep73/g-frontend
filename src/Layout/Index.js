import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { SpinnerRoundFilled } from "spinners-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { navcontent } from "../javascript/navcontent";
import { burl } from "./Apihandler/Apihandler";

export default function Index({ setend }) {

    /* const [chats,setchats] = useState(''); */
    const navigate = useNavigate();
    const [bot, setBot] = useState(""); // State to manage the bot input
    const [chatbot, setChatbot] = useState(""); // State to store the API response
    const [loading, setLoading] = useState(false); // State to manage loading status
    let [chatend, setchatend] = useState(false);
    let [data, setdata] = useState("");
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
    
    useState(()=>{
       navcontent();
    },[])



    const querydata = {
        bot: bot,
    };

    const chat = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the request starts

        
        document.getElementById('question').innerHTML = querydata.bot;
        document.getElementById('question').style.display = 'inline-block';

        document.getElementById('answer').style.display = 'block'
        // Clear existing chat
        setChatbot("");

        try {
            const response = await fetch(`/api/bot/chatbot`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(querydata),
                credentials:'include'
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            /* let text = ""; */

            while (true) {
                const { done, value } = await reader.read();
                /*  console.log('DONE', done);
                 console.log('VALUE', value); */
                if (done) {
                    setchatend(true)
                    setend.sendprop(true)
                    break
                };
                /* text += decoder.decode(value, { stream: true }); */

                setChatbot((prev) => prev + decoder.decode(value)); // Update chat UI
            }
        } catch (err) {
            alert(err.message);
            console.error(err);
        } finally {
            setLoading(false); // End loading after receiving chunks
        }
    };

    useEffect(() => {
        dataFetch()
    }, [chatend])

    useEffect(() => {
        if (!(setend.id === ""))
            
            data.forEach(element => {
                if (setend.id === element._id) {  
                    document.getElementById('answer').style.display = 'block'; 
                    document.getElementById('question').style.display='block';
                    document.getElementById('question').innerHTML = element.question
                    setChatbot(element.generate)
                    console.log('response', chatbot)
                    return;
                }
            });
    },[setend.id])



    const logout = async () => {
        try {
            const response = await fetch(`/api/user/logout`, {
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
           
            if(data.success === true){
                alert(data.message);
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            }

        } catch (error) {
            console.log('Error while fetching in the index', error);
        }
    };


    /*  const chat= async (e) => {
        document.getElementById('question').style.display = 'block';
        e.preventDefault();
        setLoading(true); // Set loading to true when the request starts
 
        let data = {
            bot: bot
        }
 
        console.log(data);
 
        const response = await axios.post("http://localhost:8000/api/chatbot", data,{
            responseType: 'stream'
        })
            try {
                console.log('axios data', response.data)
                const reader = response.data.getReader();
                const decoder = new TextDecoder('utf-8');
 
                while (true) {
                    const { done, value } = await reader.read();
                    if(done) break;
                    setChatbot((prev)=> prev + decoder.decode(value));
                }
            }
            catch(err){
                alert(err.message);
                console.log(err);
            };
        setLoading(false);
    }; */
    return (
        <>
            <div className="logout">
                <Link onClick={logout}>Logout</Link>
            </div>
            <section>
                <div className="container">
                    <main>
                        <div className="heading">
                            <h2>CHAT BOT</h2>
                            <div className="searches" id="button" >

                            </div>
                        </div>
                        <div className="question" id="question">
                            <h4 id="ques"></h4>
                        </div>
                        <div className="answer" id="answer" >
                            <div className="items">
                                {chatbot && (<ReactMarkdown>{chatbot}</ReactMarkdown>)}
                                {loading && <SpinnerRoundFilled size={50} thickness={100} speed={100} color={'silver'} secondarycolor={"rgba(0, 0, 0, 0.44)"} />}
                            </div>
                        </div>
                        <form onSubmit={chat} className="search">
                            <input type="text" placeholder="Enter You Want to Search" id="input" value={bot}
                                onChange={(e) => setBot(e.target.value)} />
                        </form>
                    </main>

                </div>
            </section>
        </>
    )
}
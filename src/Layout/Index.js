import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { SpinnerRoundFilled } from "spinners-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { navcontent } from "../javascript/navcontent";
import { burl } from "./Apihandler/Apihandler";

export default function Index({ setend }) {
    

    const navigate = useNavigate();
    const [bot, setBot] = useState(""); 
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
            setdata(data.chats); 
        } catch (error) {
            console.log('Error while fetching in the index', error);
        }
    };

    useState(() => {
        navcontent();
    }, [])



    const querydata = {
        bot: bot,
    };

    const chat = async (e) => {
        e.preventDefault();

        setLoading(true); 


        document.getElementById('question').innerHTML = querydata.bot;
        document.getElementById('question').style.display = 'inline-block';

        document.getElementById('answer').style.display = 'block'
        // Clear existing chat
        setChatbot("");

        try {
            const response = await fetch(`${burl}/api/bot/chatbot`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(querydata),
                credentials: 'include'
            });

            console.log("this is the google response data", response)

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");


            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    setchatend(true)
                    setend.sendprop(true)
                    break;
                };

                const data = decoder.decode(value);
                console.log('this is the data', data)

               /*  for (let index = 0; index < data.length; index++) { */
                    /* setTimeout(() => { */
                setChatbot((prev) => prev + data);
                   /*  }, 2 * index); */
              /*   } */
            }

        } catch (err) {
            alert(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        dataFetch()
    }, [chatend])

    useEffect(() => {
        if (!(setend.id === "") && data)

            data.forEach(element => {
                if (setend.id === element._id) {
                    document.getElementById('answer').style.display = 'block';
                    document.getElementById('question').style.display = 'block';
                    document.getElementById('question').innerHTML = element.question
                    setChatbot(element.generate)
                    console.log('response', chatbot)
                    return;
                }
            });
    }, [setend.id])
    return (
        <>

            <section>
                <div className="container">
                    <main>
                        <div className="heading">
                            <h2>CHAT BOT</h2>
                            <div className="searches" id="button" >
                            </div>
                        </div>
                        <div className="answer" id="answer" >
                            <div className="question" id="question">
                                <h4 id="ques"></h4>
                            </div>
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

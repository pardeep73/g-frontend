import axios from "axios";
import {useState} from "react";
import ReactMarkdown from 'react-markdown';


export default function Index() {

        
    
        const [bot, setBot] = useState(""); // State to manage the bot input
        const [chatbot, setChatbot] = useState(""); // State to store the API response
        const [loading, setLoading] = useState(false); // State to manage loading status
        
        
        const chat = (e) => {
            document.getElementById('question').style.display = 'block';
            e.preventDefault();
            setLoading(true); // Set loading to true when the request starts

            let data = {
                bot: bot
            }

            console.log(data);

            axios.post("http://localhost:8000/api/chatbot", data,/* {
                responseType:"stream"
            } */)
                .then((res) => {
                        setChatbot(res.data.data); // Set the received data
                        setLoading(false);
                    })
                    // Set loading to false once the response is received
                
                .catch((err) => {
                    alert(err.message);
                    setLoading(false); // Set loading to false in case of error
                    console.log(err);
                });

                console.log("this is input",bot)
                console.log("this is chatvalue",chatbot)
        };
    return (
        <>
            <section>
                <div className="container">
                    <div className="heading">
                        <h2>Chat BOT</h2>
                    </div>
                    <main>
                     
                        <div className="question" id="question">
                            {bot}
                        </div>
                        {loading && <p>Loading...</p>}
                        <div className="answer"> Here you get your answer {chatbot && (

                            <ReactMarkdown>{chatbot}</ReactMarkdown>
                        )}
                        </div>
                    </main>
                    <div className="search">
                        <input type="text" placeholder="Enter You Want to Search" id="input" value={bot}
                    onChange={(e) => setBot(e.target.value)}/>
                    <button onClick={chat}>Generate</button>
                    </div>
                </div>
            </section>
        </>
    )
}
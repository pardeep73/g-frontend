import axios from "axios";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';


export default function Index() {



    const [bot, setBot] = useState(""); // State to manage the bot input
    const [chatbot, setChatbot] = useState(""); // State to store the API response
    const [loading, setLoading] = useState(false); // State to manage loading status

    const chat = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when the request starts
    
        const data = {
            bot: bot,
        };
    
        // Clear existing chat
        setChatbot("");
    
        try {
            const response = await fetch("http://localhost:8000/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let text = "";
    
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                text += decoder.decode(value, { stream: true });
                setChatbot((prev) => prev + decoder.decode(value)); // Update chat UI
            }
        } catch (err) {
            alert(err.message);
            console.error(err);
        } finally {
            setLoading(false); // End loading after receiving chunks
        }
    };
    

/*     const chat = (e) => {
        document.getElementById('question').style.display = 'block';
        e.preventDefault();
        setLoading(true); // Set loading to true when the request starts

        let data = {
            bot: bot
        }

        console.log(data);
        let datachunks = ""
        const reponse = axios.post("http://localhost:8000/api/chatbot", data,)

            .then((res) => {
                setChatbot(res.data)
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
        const interval = setInterval((chunks) => {
            setChatbot(chunks)

            if (!chunks) {
                clearInterval(interval);
            }
        }, 1000)

        setLoading(false);
    }; */
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
                            onChange={(e) => setBot(e.target.value)} />
                        <button onClick={chat}>Generate</button>
                    </div>
                </div>
            </section>
        </>
    )
}
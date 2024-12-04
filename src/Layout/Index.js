import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { SpinnerRoundFilled } from "spinners-react";


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
        let question = document.getElementById('question');
        question.style.display = 'inline-block';
        document.getElementById('ques').innerText = data.bot
        // Clear existing chat
        setChatbot("");

        try {
            const response = await fetch("https://backend-t9x8.onrender.com/api/chatbot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
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
                if (done) break;
                /* text += decoder.decode(value, { stream: true }); */
                document.getElementById('answer').style.display = 'block'
                setChatbot((prev) => prev + decoder.decode(value)); // Update chat UI
            }
        } catch (err) {
            alert(err.message);
            console.error(err);
        } finally {
            setLoading(false); // End loading after receiving chunks
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
            <section>
                <div className="container">

                    <main>
                        <div className="heading">
                            <h2>CHAT BOT</h2>
                        </div>
                        <div className="question" id="question">
                            <h4 id="ques"></h4>
                        </div>
                        <div className="answer" id="answer">
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
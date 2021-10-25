import { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';


const Chat = ({ socket, username, room }) => {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageLest, setMessageLest] = useState([]);

  const sendMessage = async() => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message",messageData)
      setMessageLest( (list) => [...list,messageData])
      setCurrentMessage("")
    }
  };


  useEffect(() => {
      socket.on("receive_message",(data)=>{
        setMessageLest( (list) => [...list,data])
      })

  }, [socket])




  return (
    <>
      <div className="contenar-all">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
    <ScrollToBottom className="message-container" >
        {messageLest.map( (messageContent)=>{
          return (
            <div className="message"  id={username === messageContent.author ? "you" : "other"}>
              
                    <div className="message-content" >
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta" >
                      <p id="time" >{messageContent.time}</p>
                      <p id="author" >{messageContent.author}</p>
                      
                    </div>
              
            </div>
          )
        }) }
        </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="message..."
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            onKeyPress={ e => {e.key === "Enter" && sendMessage()}}
          />
          <button onClick={sendMessage}>Send &#9658;</button>
        </div>
      </div>
    </>
  );
};

export default Chat;

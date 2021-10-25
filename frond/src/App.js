import "./App.css"

import io from "socket.io-client";
import { useState } from "react";
import Chat from './page/Chat';

var socket = io.connect("http://localhost:3001")


function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat , setShowChat] = useState("");

  const joinRoom = () =>{
      if(username !== "" && room !== ""){
        socket.emit("join_room" , room)
        setShowChat(true)
      }
  }
  
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">

          <h3>join a Chat</h3>
      
            <input type="text" placeholder="name..." onChange={(e)=>{setUsername(e.target.value)}} />
            <input type="text" placeholder="Room ID" onChange={(e)=>{setRoom(e.target.value)}} />
            <button onClick={joinRoom} >Joun A Room</button>
        </div>
      )

      :(

        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
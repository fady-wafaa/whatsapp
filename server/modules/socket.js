const {Server} = require("socket.io")

let io;

module.exports = {
    init:(httpSever)=>{
      io =  new Server(httpSever,{
        cors:{
            origin:"http://localhost:3000",
            // methods:["GET","POST"]
            }
        }
        )
        return io ;
    },
    getIO: ()=>{
        if(!io)throw new Error("socket error") ;
        return io ;
    }
}
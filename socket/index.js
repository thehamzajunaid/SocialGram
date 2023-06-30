const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let connectedUsers = []

const addUsers = (userId, socketId) => {
    !connectedUsers.some(user=> user.userId === userId) &&
    connectedUsers.push({userId, socketId})
}

const removeUser = (socketId) => {
    connectedUsers = connectedUsers.filter(user=> user.socketId !== socketId)
}

const getUser = (userId) => {
    return connectedUsers.find(user=> user.userId === userId)
}

io.on("connection", (socket) => {
    //when a connection is established
    console.log("User connected")

    //Take the userId received from the client side and add it to the
    // connectedUsers array along with the socketId that was created for
    // this user.
    socket.on("addUser", userId => {
        addUsers(userId, socket.id)
        io.emit("getUsers", connectedUsers)
    })

    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text})=> {
        //find the receiver
        const receiver = getUser(receiverId)
        //send message to only this specific user(reciever)
        io.to(receiver.socketId).emit("getMessage", {
            senderId,
            text
        })

    })


    //Remove the user from the array who just disconnected
    socket.on("disconnect", ()=> {
        console.log("User disconnected")
        removeUser(socket.id)
        io.emit("getUsers", connectedUsers)
    }) 
  });


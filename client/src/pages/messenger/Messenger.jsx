import './messenger.scss'
import Topbar from '../../components/Topbar/Topbar'
import Conversation from '../../components/Conversations/Conversation'
import Message from '../../components/Message/Message'
import ChatOnline from '../../components/ChatOnline/ChatOnline'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import {io} from "socket.io-client"
import { useRef } from 'react'



function Messenger() {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages ] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const {user} = useContext(AuthContext)
    const scrollRef = useRef()

    useEffect(()=> {
        socket.current = io("ws://localhost:8900")
        socket.current?.on("getMessage", (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(()=> {
        arrivalMessage && 
            currentChat?.members.includes(arrivalMessage?.senderId) &&
            setMessages((prev)=> [...prev, arrivalMessage])
    },[arrivalMessage, currentChat])

    useEffect(()=> {
        socket.current?.emit("addUser", user._id)
        socket.current?.on("getUsers", connectedUsers=> {
            // console.log(connectedUsers)
            setOnlineUsers(user.followings.filter((friend)=> connectedUsers.some((cu)=> cu.userId === friend)))
        })
    },[user])

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`/conversations/${user._id}`)
                setConversations(res.data)
            } catch (error) {
                console.log(err)
            }
            
        }
        getConversations()
    }, [user._id])

    useEffect(()=> {
        const getMessages = async () => {
            try {
                const res = await axios.get("/messages/"+currentChat?._id)
                setMessages(res.data)

            } catch (error) {
                console.log(error)
            }
            
        }
        getMessages()
    }, [currentChat])
    
    // console.log(messages)

    //the chatbox should scroll down when new message is sent
    useEffect(()=> {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        //send the data to socket so we can share it to the receiver in real time
        const receiverId = currentChat.members.find(member=> member !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })

        try {
            const res = await axios.post("/messages", message)
            setMessages([...messages, res.data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
    <Topbar/>
    <div className='messenger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input type="text" placeholder='Search for convo' className='chatMenuInput' />
                {conversations.map((c)=> (
                    <div onClick={()=> setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={user}/>
                    </div>
                ))}           
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                {
                    currentChat ?
                <>
                <div className="chatBoxTop">
                    {messages.map((m) => (
                        <div ref={scrollRef}>
                            <Message message={m} own={m.sender === user._id}/>
                        </div>
                        
                    ))}
                    
                </div>
                <div className="chatBoxBottom">
                    <textarea className='chatMessageInput' placeholder='write something..' onChange={(e)=> setNewMessage(e.target.value)} value={newMessage}></textarea>
                    <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                </div>
                </> : <span className='noConversationText'> Open a conversation to start a chat </span>
                }
    
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                <ChatOnline onlineUsers={onlineUsers} currentUserId={user._id} setCurrentChat={setCurrentChat}/>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Messenger
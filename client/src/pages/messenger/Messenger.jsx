import './messenger.scss'
import Topbar from '../../components/Topbar/Topbar'
import Conversation from '../../components/Conversations/Conversation'
import Message from '../../components/Message/Message'
import ChatOnline from '../../components/ChatOnline/ChatOnline'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'



function Messenger() {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages ] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const {user} = useContext(AuthContext)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

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
                        <Message message={m} own={m.sender === user._id}/>
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
                <ChatOnline/>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Messenger
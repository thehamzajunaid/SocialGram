import { useEffect, useState } from 'react'
import './conversations.css'
import axios from 'axios'


function Conversation({conversation, currentUser}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState(null)
  useEffect(()=> {
    const friendId = conversation.members.find((u)=> u !== currentUser._id)
    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId="+friendId)
        // console.log(res.data)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
      
    }
    getUser()
  }, [conversation, currentUser])


  return (
    <div className='conversation'>
        <img className="conversationImg" src={user?.profilePicture ? user.profilePicture : PF+"person/noPicture.jpg"} alt=''/>
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation
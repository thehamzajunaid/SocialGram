import { useEffect, useState } from 'react'
import './chatonline.css'
import axios from 'axios'

function ChatOnline({onlineUsers, currentUserId, setCurrentChat}) {

  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(()=> {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/"+currentUserId)
      setFriends(res.data)
    }

    getFriends()
  }, [currentUserId])

  useEffect(()=> {
    setOnlineFriends(friends.filter(friend=> onlineUsers.includes(friend._id)))
  },[friends, onlineUsers])

  const handleClick = async (onlineUser) => {
    try {
      const res = await axios.get(`/conversations/find/${currentUserId}/${onlineUser._id}`)
      setCurrentChat(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='chatOnline'>
      {onlineFriends?.map(online => (
        <div className="chatOnlineFriend" onClick={()=> handleClick(online) }>
          <div className="chatOnlineImgContainer">
            <img src={online.profilePicture ? PF+online.profilePicture: PF+"person/noPicture.jpg"} alt="" className="chatOnlineImg" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{online.username}</span>
        </div>

      ))}
        
    </div>
  )
}

export default ChatOnline
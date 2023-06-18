import './profile.css'
import Sidebar from "../../components/Sidebar/Sidebar"
import Topbar from "../../components/Topbar/Topbar"
import Feed from "../../components/Feed/Feed"
import Rightbar from "../../components/Rightbar/Rightbar"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Profile() {
  const PF  = process.env.REACT_APP_PUBLIC_FOLDER

  const [user, setUser] = useState([])
  const username = useParams().username;


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`)
      setUser(res.data)
    }
    // console.log("hello")
    fetchUser()
    
  }, [username])

  return(
    <>
    <Topbar/>
      <div className="profileContainer">
        <Sidebar/>
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src={user.coverPicture ? PF+user.coverPicture:  PF+"person/noCover.png" } className="profileCoverImage"/>
                    <img src={user.profilePicture ? PF+user.coverPicture: PF+"person/noPicture.jpg"} className="profileUserImage"/>
                    
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.desc}</span>
                </div>              
            </div>
            <div className="profileRightBottom">
                <Feed username={username}/>
                <Rightbar user={user}/>
            </div>
        </div>      
      </div>
    </>
  )
}

export default Profile
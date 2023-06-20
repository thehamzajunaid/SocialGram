import './rightbar.scss'
import {Users} from "../../dummyData"
import OnlineFriends from '../OnlineFriends/OnlineFriends'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Rightbar({user}) {

  const PF  = process.env.REACT_APP_PUBLIC_FOLDER

  const HomeRightbar = () => {

    const PF  = process.env.REACT_APP_PUBLIC_FOLDER

    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/birthday.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Zaki Junaid</b> and <b>3 others</b> have birthdays today
          </span>
        </div>
        <img className='rightbarAd' src="/assets/ad.jpg"/>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(user=>(
              <OnlineFriends key={user.id} user={user} />
          ))}
          
        </ul>
      </>
    )
  }

  const ProfileRightbar = ({user}) => {

    const PF  = process.env.REACT_APP_PUBLIC_FOLDER
    const [followings, setFollowings] = useState([])
    const {user: currentUser, dispatch} = useContext(AuthContext)
    const [followed, setFollowed] = useState(currentUser.followings.includes(user._id))

    const handleFollowClick = async () => {
      try {
        if(followed){
          await axios.put("/users/"+user._id+"/unfollow", {userId: currentUser._id})
          dispatch({type: "UNFOLLOW", payload: user._id})
        }else{
          await axios.put("/users/"+user._id+"/follow", {userId: currentUser._id})
          dispatch({type: "FOLLOW", payload: user._id})
        }
      } catch (error) {
        console.log(error)
      }
      setFollowed(!followed)
    }

  useEffect(() => {
    const getFollowings = async () => {
      try {
        const followingList = await axios.get("/users/friends/"+user._id)
        setFollowings(followingList.data)
      } catch (error) {
        console.log(error)
      }
    }
    getFollowings()

  }, [user._id])

    return (
      <>
      {
        user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleFollowClick}>
            {followed ? "Unfollow": "Follow"}
            {followed ? <RemoveIcon/>: <AddIcon/>}
          </button>
        )
      }
      <h4 className='rightbarTitle'>User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">{user.from ? user.from : "-"}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">{user.relationship===1 ? "single" : user.relationship===1 ? "married" : "-"}</span>
        </div>
      </div>

      <h4 className='rightbarTitle'>User Friends</h4>
      <div className="rightbarFollowings">
        {followings.map(following=> (
        <div key={following._id} className="rightbarFollowing">
          <img src={following.profilePicture ? PF+following.profilePicture : PF+"person/noPicture.jpg"} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">{following.username}</span>
        </div>
        ))}
        
      </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar user={user}/> : <HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar
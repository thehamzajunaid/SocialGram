import './rightbar.css'
import {Users} from "../../dummyData"
import OnlineFriends from '../OnlineFriends/OnlineFriends'

function Rightbar({user}) {

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

  const ProfileRightbar = () => {

    const PF  = process.env.REACT_APP_PUBLIC_FOLDER

    return (
      <>
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
        <div className="rightbarFollowing">
          <img src={`${PF}person/4.jpg`} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Zaki Bhai</span>
        </div>
        <div className="rightbarFollowing">
          <img src={`${PF}person/5.jpg`} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Zaki Bhai</span>
        </div>
        <div className="rightbarFollowing">
          <img src={`${PF}person/6.jpg`} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Zaki Bhai</span>
        </div>
        <div className="rightbarFollowing">
          <img src={`${PF}person/7.jpg`} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Zaki Bhai</span>
        </div>
        <div className="rightbarFollowing">
          <img src={`${PF}person/8.jpg`} alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Zaki Bhai</span>
        </div>
      </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar
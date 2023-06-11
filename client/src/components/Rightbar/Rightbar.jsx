import './rightbar.css'
import {Users} from "../../dummyData"
import OnlineFriends from '../OnlineFriends/OnlineFriends'

function Rightbar({profile}) {

  const HomeRightbar = () => {
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
    return (
      <>
      <h4 className='rightbarTitle'>User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoValue">New York</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoValue">Karachi</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">Single</span>
        </div>
      </div>

      <h4 className='rightbarTitle'>User Friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img src="assets/person/4.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Zaki Bhai</span>
        </div>
        <div className="rightbarFollowing">
          <img src="assets/person/5.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Zaki Bhai</span>
        </div>
        <div className="rightbarFollowing">
          <img src="assets/person/6.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Zaki Bhai</span>
        </div>
        <div className="rightbarFollowing">
          <img src="assets/person/7.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Zaki Bhai</span>
        </div>
        <div className="rightbarFollowing">
          <img src="assets/person/8.jpg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Zaki Bhai</span>
        </div>
      </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar
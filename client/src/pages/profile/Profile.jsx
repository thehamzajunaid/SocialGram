import './profile.css'
import Sidebar from "../../components/Sidebar/Sidebar"
import Topbar from "../../components/Topbar/Topbar"
import Feed from "../../components/Feed/Feed"
import Rightbar from "../../components/Rightbar/Rightbar"

function Profile() {
  return (
    <>
    <Topbar/>
      <div className="profileContainer">
        <Sidebar/>
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src='assets/post/2.jpg' className="profileCoverImage"/>
                    <img src='assets/person/3.jpg' className="profileUserImage"/>
                    
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">Hamza Junaid</h4>
                    <span className="profileInfoDesc">Hi my friends</span>
                </div>              
            </div>
            <div className="profileRightBottom">
                <Feed/>
                <Rightbar profile/>
            </div>
        </div>      
      </div>
    </>
  )
}

export default Profile
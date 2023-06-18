import './topbar.css'
import { Search,Person , Chat, Notifications} from '@mui/icons-material'
import { useContext } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

function Topbar() {

  const {user} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const delay = ms => new Promise(res => setTimeout(res, ms));
  return (
    <div className='topbarContainer'>
        <div className="topbarLeft">
          <Link to="/" style={{textDecoration: "none"}}  >
            <div className="logo">SocialGram</div>
          </Link>
          {/* onClick={async () => {
            await delay(1000)
            window.location.reload()
          }} */}
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className='searchIcon'/>
            <input className='searchInput' placeholder='Search for friend, post'/>
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Home</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person/>
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat/>
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications/>
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture ? PF + user.profilePicture : PF+"person/noPicture.jpg"} alt="person" className="topbarImage" />
          </Link>
          
        </div>
    </div>
  )
}

export default Topbar
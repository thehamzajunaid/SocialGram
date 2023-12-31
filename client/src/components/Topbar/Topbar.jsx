import './topbar.scss'
import { Search,Person , Chat, Notifications} from '@mui/icons-material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useContext } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

function Topbar() {

  const {user, toggle, darkMode} = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const handleLogout = () => {
    localStorage.setItem("user", null)
    window.location.reload()
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));
  return (
    <div className='topbarContainer'>
        <div className="topbarLeft">
          <span className="topbarLeftLogo">
          <Link to="/" style={{textDecoration: "none"}}  >
            <div className="logo">SocialGram</div>
          </Link>
          </span>
          <span className='topbarLeftDarkMode' onClick={toggle}>{darkMode ? <LightModeOutlinedIcon sx={{color: 'white'}}/> : <DarkModeOutlinedIcon /> }</span>
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
          <div className='topbarRightLogoutProfile'>
            <span className='topbarRightLogoutProfileItem' title="Profile Page">
              <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture ? PF + user.profilePicture : PF+"person/noPicture.jpg"} alt="person" className="topbarImage" />
              </Link>
            </span>
            <span className='topbarRightLogoutProfileItem' title="Logout" onClick={handleLogout}>
              <PowerSettingsNewIcon/>
            </span>        
          </div>        
        </div>
    </div>
  )
}

export default Topbar
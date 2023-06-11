import './sidebar.css'
import {Users} from "../../dummyData"

import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import CloseFriends from '../CloseFriends/CloseFriends';


function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className='sidebarItemIcon'/>
            <span className="sidebarItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className='sidebarItemIcon'/>
            <span className="sidebarItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleIcon className='sidebarItemIcon'/>
            <span className="sidebarItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className='sidebarItemIcon'/>
            <span className="sidebarItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className='sidebarItemIcon'/>
            <span className="sidebarItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineIcon className='sidebarItemIcon'/>
            <span className="sidebarItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkIcon className='sidebarItemIcon'/>
            <span className="sidebarItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className='sidebarItemIcon'/>
            <span className="sidebarItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon className='sidebarItemIcon'/>
            <span className="sidebarItemText">Courses</span>
          </li>

        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className='sidebarHr'/>
        <ul className="sidebarFriendList">
          {Users.map(user=>(
              <CloseFriends key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
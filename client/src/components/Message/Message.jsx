import './message.css'
import {format} from 'timeago.js'

function Message({message, own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img src="https://images.unsplash.com/photo-1638486071992-536e48c8fa3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9vayUyMGJhY2t8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" className="messageImg" />
            <p className="messageText">
              {message.text}
            </p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
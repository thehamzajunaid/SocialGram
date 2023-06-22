import './chatonline.css'

function ChatOnline() {
  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJQWpRvVqHBOyEchfM5rxkOPOvK1tIawii-tUgZXTsUPgPgE1ah6jQCYfsffhrInH07CM&usqp=CAU" alt="" className="chatOnlineImg" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Hamza</span>
        </div>
    </div>
  )
}

export default ChatOnline
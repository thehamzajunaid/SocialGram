import './messenger.scss'
import Topbar from '../../components/Topbar/Topbar'
import Conversation from '../../components/Conversations/Conversation'
import Message from '../../components/Message/Message'
import ChatOnline from '../../components/ChatOnline/ChatOnline'


function Messenger() {
  return (
    <>
    <Topbar/>
    <div className='messenger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input type="text" placeholder='Search for convo' className='chatMenuInput' />
                <Conversation/>
                <Conversation/>
                <Conversation/>
                <Conversation/>
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                </div>
                <div className="chatBoxBottom">
                    <textarea className='chatMessageInput' placeholder='write something..'></textarea>
                    <button className='chatSubmitButton' >Send</button>
                </div>
    
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                <ChatOnline/>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Messenger
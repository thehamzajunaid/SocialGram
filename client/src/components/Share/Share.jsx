import './share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import RoomIcon from '@mui/icons-material/Room';
import LabelIcon from '@mui/icons-material/Label';

function Share() {
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src="/assets/person/1.jpg" alt="" /> 
                <input className="shareInput" placeholder="What's in your mind, Hamza?"  />

            </div>
            <hr className="shareHr"/>
            <div className="shareBottom">
                <div className="shareOptions">
                    <div className="shareOption">
                        <PermMediaIcon htmlColor='tomato' className='shareIcon'/>
                        <span className="shareOptionText">Photos/Videos</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotionsIcon htmlColor='blue' className='shareIcon'/>
                        <span className="shareOptionText">Feeling</span>
                    </div>
                    <div className="shareOption">
                        <RoomIcon htmlColor='red' className='shareIcon'/>
                        <span className="shareOptionText">Location</span>
                    </div>
                </div>
                <button className='shareButton'>Share</button>
                
            </div>
        </div>
    </div>
  )
}

export default Share
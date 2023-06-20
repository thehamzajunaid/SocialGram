import './share.scss'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import RoomIcon from '@mui/icons-material/Room';
import LabelIcon from '@mui/icons-material/Label';
import { useContext, useRef, useState } from 'react';
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'



function Share() {

    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [file, setFile] = useState(null)
    const desc = useRef()

    const submitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId : user._id,
            desc: desc.current.value
        }

        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            
            data.append("name", filename)
            data.append("image", file)
                                 
            newPost.img = filename
            try{
                await axios.post("/upload",data)
            }catch(err){
                console.log(err)
            }
        }

        try{
            if(!file && newPost.desc ===''){
                alert("Cannot post empty")
            }
            else{
                await axios.post("/posts",newPost)
                window.location.reload()
            }
            
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img className="shareProfileImg" src={user.profilePicture ? PF+user.profilePicture : PF+"person/noPicture.jpg"} alt="" /> 
                <input className="shareInput" placeholder={`Whats in your mind, ${user.username}?`} ref={desc} />

            </div>
            <hr className="shareHr"/>
            {file && (
                <div className="shareImgContainer">
                    {/* URL.createObjectURL(file) */}
                    <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                    <CancelIcon className='shareCancelImg' onClick={()=> setFile(null)}/>
                </div>
            )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMediaIcon htmlColor='tomato' className='shareIcon'/>
                        <span className="shareOptionText">Photos/Videos</span>
                        <input style={{display: "none"}} id="file" type='file' name='image' accept='.png, .jpg, .jpeg' onChange={(e)=> setFile(e.target.files[0])} onClick={(event)=> event.target.value = null}/>
                    </label>
                    <div className="shareOption">
                        <EmojiEmotionsIcon htmlColor='blue' className='shareIcon'/>
                        <span className="shareOptionText">Feeling</span>
                    </div>
                    <div className="shareOption">
                        <RoomIcon htmlColor='red' className='shareIcon'/>
                        <span className="shareOptionText">Location</span>
                    </div>
                </div>
                <button type='submit' className='shareButton'>Share</button>
                
            </form>
        </div>
    </div>
  )
}

export default Share
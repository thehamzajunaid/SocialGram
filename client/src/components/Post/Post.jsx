import React, { useContext, useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './post.css'
import axios from 'axios';
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
// import { Users } from '../../dummyData'


function Post({post}) {
   
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setiIsLiked] = useState(false)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState([])
    const {user:currentUser} = useContext(AuthContext)

    //to handle the problem of "post is disliked" response when user already liked a post in past
    // and try to like it again
    useEffect(()=> {
        setiIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    const likeHandler=()=> {
        try{
            axios.put("/posts/"+post._id+"/like/",{userId: currentUser._id})
        }catch(err){

        }
        setLike(isLiked ? like-1 : like+1)
        setiIsLiked(!isLiked)
    }

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/users?userId=${post.userId}`)
          setUser(res.data)
        }
        // console.log("hello")
        fetchUser()
        
      }, [post.userId])

      const delay = ms => new Promise(res => setTimeout(res, ms));

  return (
    <div className='post'>
        <div className="postWrapper">
            <div className="postTop">
                 <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`} style={{textDecoration: "none"}}>
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noPicture.jpg"} alt="" className="postProfileImg" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                 </div>
                 <div className="postTopRight">
                    <MoreVertIcon/>
                 </div>
            </div>
            <div className="postCentre">
                <span className="postText">{post?.desc}</span>
                <img src={PF+post.img} alt="" className="postImg" />

            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img src={`${PF}like.png`}alt="" className="likeIcon" onClick={likeHandler}/>
                    <img src={`${PF}heart.png`} alt="" className="likeIcon" onClick={likeHandler}/>
                    <span className="postLikeCounter">{like} people liked it</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Post
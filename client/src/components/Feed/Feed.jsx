import Share from '../Share/Share'
import Post from '../Post/Post'
import './feed.css'
import { useEffect, useState } from 'react'
// import { Posts } from '../../dummyData'
import axios from "axios"

function Feed({username}) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username 
        ? await axios.get("/posts/profile/"+username) 
        : await axios.get("/posts/timeline/645689d5c78ae6129d3d5f33");
      setPosts(res.data)
    }
    // console.log("hello")
    fetchPosts()
    
  }, [])
  

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share/>
        {posts.map(p=>(
          <Post key={p._id} post={p}/>
        ))}
        
      </div>
    </div>
  )
}

export default Feed
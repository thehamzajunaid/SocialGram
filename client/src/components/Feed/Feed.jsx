import Share from '../Share/Share'
import Post from '../Post/Post'
import './feed.css'
import { useEffect, useState } from 'react'
// import { Posts } from '../../dummyData'
import axios from "axios"

function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      if (window.location.pathname.includes("profile")){

      }
      const res = await axios.get("posts/timeline/645689d5c78ae6129d3d5f33")
      setPosts(res.data)
    }
    // console.log("hello")
    fetchPosts()
    
  }, [posts])
  

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
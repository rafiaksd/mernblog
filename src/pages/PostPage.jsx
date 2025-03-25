     import {useContext, useEffect, useState} from "react";
     import { UserContext } from "../contexts/UserContext";

     import { useParams } from "react-router-dom";
     import {Link} from 'react-router-dom';

     import ReactMarkdown from 'react-markdown';

     export default function PostPage(){
          const [postInfo,setPostInfo] = useState(null);
          const {id} = useParams()
          const{userInfo} = useContext(UserContext)

          useEffect(()=>{
               fetch(`https://mern-blog-backend-lhfx.onrender.com/post/${id}`)
               .then(response => {
                    response.json().then(postInfo =>{
                         setPostInfo(postInfo)
                    })
               })
          }, [])

          if(!postInfo) return ''

          return (
               <div className="post-page">
                    <span className="author">by @{postInfo.author?.username || 'Unknown author'} </span>at
                    <span style={{ marginLeft: '5px' }}>{new Date(postInfo.createdAt).toLocaleDateString()}</span>

                    {userInfo.id === postInfo.author._id && (
                         <Link to={`/edit/${postInfo._id}`} className="edit-row">
                              <a className="edit-btn" href="">Edit this post</a>
                         </Link>
                    )}
                    
                    <h1>{postInfo.title}</h1>
                    <ReactMarkdown>{postInfo.content}</ReactMarkdown>
               </div>
          )
     }
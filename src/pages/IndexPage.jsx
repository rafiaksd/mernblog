import Post from '../components/Post';
import { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Use axios to fetch posts
    axios.get('https://mern-blog-backend-lhfx.onrender.com/post')
      .then(response => {
        setPosts(response.data);  // Set the fetched posts to state
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <main>
      <h1 className="page-title">Recent Blog Posts</h1>
      {posts.length > 0 ? (
        <div className="posts-container">
          {posts.map(post => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </main>
  );
}

import Post from '../components/Post';
import { useEffect, useState } from 'react';
import { getPosts } from '../utils/api';  // Import the getPosts function

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Use the getPosts function from api.js
    getPosts()
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

import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    e.preventDefault();

    // Send data as JSON
    const postData = {
      title,
      summary,
      content,
    };

    try {
      const response = await axios.post('https://mern-blog-backend-lhfx.onrender.com/post', postData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json', // Ensure you're sending JSON data
        },
      });

      console.log("Post created successfully:", response.data);
      setRedirect(true);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <form onSubmit={createNewPost}>
        <input
          type="text"
          placeholder={'Title'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder={'Summary'}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <textarea
          style={{ width: '100%', height: '40vh' }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button style={{ marginTop: '5px' }}>Create Post</button>
      </form>
    </>
  );
}

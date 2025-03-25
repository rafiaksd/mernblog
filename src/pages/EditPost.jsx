import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const [redirect, setRedirect] = useState(false);

  // Fetch the current post details when the component mounts
  useEffect(() => {
    fetch('https://mern-blog-backend-lhfx.onrender.com/post/' + id)
      .then(response => response.json())
      .then(postInfo => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
  }, [id]);

  // Handle the post update
  async function updatePost(e) {
    e.preventDefault();

    // Prepare the data as JSON
    const postData = {
      id,
      title,
      summary,
      content,
    };

    try {
      const response = await axios.put('https://mern-blog-backend-lhfx.onrender.com/post', postData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.status === 200) {
        setRedirect(true);
      }

    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  // Redirect to the post page after successful update
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <>
      <form onSubmit={updatePost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <textarea
          style={{ width: '100%', height: '40vh' }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button style={{ marginTop: '5px' }}>UPDATE Post</button>
      </form>
    </>
  );
}

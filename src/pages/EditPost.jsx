import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getPost, updatePost } from '../utils/api';  // Import the updatePost function

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  const [redirect, setRedirect] = useState(false);

  // Fetch the current post details when the component mounts
  useEffect(() => {
    getPost(id)  // Use the getPost function from api.js
      .then(response => {
        const postInfo = response.data;
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
  }, [id]);

  // Handle the post update
  async function updatePostHandle(e) {
    e.preventDefault();
    const postData = { id, title, summary, content };

    try {
      const response = await updatePost(id, postData);
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  }

  // Redirect to the post page after successful update
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <>
      <form onSubmit={updatePostHandle}>
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

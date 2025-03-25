import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("https://mern-blog-backend-lhfx.onrender.com/profile", { withCredentials: true })
      .then(({ data }) => setUserInfo(data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  function logout() {
    axios.post("https://mern-blog-backend-lhfx.onrender.com/logout", {}, { withCredentials: true })
      .then(() => setUserInfo(null))
      .catch((err) => console.error("Logout failed:", err));
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        My Logo
      </Link>

      <nav>
        {username ? (
          <>
            <span>Hello, <span className='header-name'>{username}</span>!</span>
            <Link to="/create">Create New Post</Link>
            <a onClick={logout} style={{ cursor: "pointer" }}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

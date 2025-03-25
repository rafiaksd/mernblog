import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { getUserProfile, logout } from '../utils/api';  // Import the getPosts function

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    // Use the getUserProfile function from api.js to fetch the profile
    getUserProfile()
      .then(({ data }) => setUserInfo(data))
      .catch((err) => console.error("Error fetching profile:", err));
  }, [setUserInfo]);

  const handleLogout = () => {
    // Use the logout function from api.js to log out the user
    logout()
      .then(() => setUserInfo(null)) // Clear user info on successful logout
      .catch((err) => console.error("Logout failed:", err));
  };

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
            <a onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</a>
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

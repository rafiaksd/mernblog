import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();

    try {
      const { data } = await axios.post("https://mern-blog-backend-lhfx.onrender.com/login", 
        { username, password }, 
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      setUserInfo(data);
      setRedirect(true);
    } catch (err) {
      alert("Wrong credentials");
      console.error("Login error:", err);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button>Login</button>
    </form>
  );
}

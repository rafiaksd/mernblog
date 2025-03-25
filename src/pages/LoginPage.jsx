import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { login } from '../utils/api';  // Import the new login function

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const userData = { username, password };  // Combine username and password in an object
      const { data } = await login(userData); 

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
    <form className="login" onSubmit={handleLogin}>
      <h1>Login</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
}

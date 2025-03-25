import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(event) {
    event.preventDefault();

    try {
      const { status } = await axios.post("https://mern-blog-backend-lhfx.onrender.com/register", 
        { username, password }, 
        { headers: { "Content-Type": "application/json" } }
      );

      if (status === 200) {
        alert("Registration successful!");
      }
    } catch (err) {
      alert("Registration failed.");
      console.error("Registration error:", err);
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button>Register</button>
    </form>
  );
}

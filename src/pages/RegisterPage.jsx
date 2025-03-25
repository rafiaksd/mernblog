import { useState } from "react";
import { register } from '../utils/api';  // Import the new register function

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(event) {
    event.preventDefault();

    try {
      const userData = { username, password };  // Combine username and password in an object
      const { status } = await register(userData); 

      if (status === 200) {
        alert("Registration successful!");
      }
    } catch (err) {
      alert("Registration failed.");
      console.error("Registration error:", err);
    }
  }

  return (
    <form className="register" onSubmit={handleRegister}>
      <h1>Register</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button>Register</button>
    </form>
  );
}

import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      alert("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  const buttonStyle = {
    backgroundColor: '#4a4a4a',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    fontSize: '14px',
    fontWeight: 'bold'
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      <div style={{ backgroundColor: '#f0f0f0', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
        <Link to="/" style={{ ...buttonStyle, display: 'block', marginBottom: '20px', textAlign: 'center' }}>← Back to Home</Link>
        <h1>Login</h1>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />

        <div>
          <button onClick={handleLogin} style={buttonStyle}>Login</button>
          <button onClick={handleSignup} style={buttonStyle}>Signup</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
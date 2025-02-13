import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();
    const randomFourDigitNumber = () => Math.floor(Math.random() * 9000) + 1000;
    try {
      const response = await axios.post("http://localhost:5000/register", {
        login: login,
        password: password,
        user: user,
      });
      if (response.data) {
        navigate('/login');
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error during login:", error.response?.data || error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Sign Up</h1>
      <form style={styles.form} onSubmit={onSubmit}>
        <input
          type="text"
          value={login}
          placeholder="Login"
          onChange={(e) => setLogin(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          value={user}
          placeholder="User"
          onChange={(e) => setUser(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
      <Link style={{ color: 'black', marginTop: 20 }} to="/login">Log In</Link>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f4f8",
    color: "#333",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    color: "#007BFF",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  input: {
    padding: "0.8rem",
    fontSize: "1rem",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "0.8rem 2rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  link: {
    color: 'black !important',
  }
};

export default Register;

import React from "react";
import { useNavigate } from "react-router-dom"; // To handle navigation

const Home = () => {
  const navigate = useNavigate();

  // Function to navigate to Login page
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to the Home Page!</h1>
      <p style={styles.text}>
        Manage your tasks efficiently with our task manager. Get started by
        logging in.
      </p>
      <button style={styles.button} onClick={handleLoginClick}>
        Log In
      </button>
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
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "#007BFF",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    maxWidth: "600px",
    lineHeight: "1.5",
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
};

// Hover effect for the button
styles.button["hover"] = {
  backgroundColor: "#0056b3",
};

export default Home;

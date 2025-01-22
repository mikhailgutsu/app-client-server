import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/tasks");
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        {isLoggedIn
          ? "Welcome back to the Home Page!"
          : "Welcome to the Home Page!"}
      </h1>
      <p style={styles.text}>
        {isLoggedIn
          ? "Manage your tasks and stay productive. Click below to go to your tasks."
          : "Manage your tasks efficiently with our task manager. Get started by logging in."}
      </p>
      <button style={styles.button} onClick={handleButtonClick}>
        {isLoggedIn ? "Go to Tasks" : "Log In"}
      </button>
    </div>
  );
};

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

export default Home;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem("userData");

  // Functia pentru log out
  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    navigate("/");
    window.location.reload();
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
          )}
        </ul>
        {isLoggedIn && (
          <button onClick={handleLogout} style={styles.logoutButton}>
            Log Out
          </button>
        )}
      </nav>
    </header>
  );
};

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  logoutButton: {
    padding: "0.5rem 1.5rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#d9534f",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginLeft: "auto", // Asigură că butonul de logare este împins la dreapta
  },
};

export default NavBar;

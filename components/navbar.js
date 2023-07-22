import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
      setTheme("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
      setTheme("light");
    }
  };

  return (
    <>
      <button className={styles.hamburger} onClick={() => setIsOpen(isOpen)}>
        &#9776;
      </button>
      <nav
        className={`${styles.navbar} ${isOpen ? styles.open : styles.closed}`}
      >
        {" "}
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/editor">Editor</Link>
          </li>
        </ul>
        <div className={styles.login}>
          <Link href="/auth">Login/Signup</Link>
        </div>
        <button onClick={toggleTheme}>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>
    </>
  );
}

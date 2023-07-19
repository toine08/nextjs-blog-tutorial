import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

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
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/editor">Editor</Link>
        </li>
      </ul>

      <button onClick={toggleTheme}>
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </nav>
  );
}

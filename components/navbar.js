import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import utilStyles from "../styles/utils.module.css";
import { useUser } from "../pages/_app";
import { supabase } from "../lib/supabaseClient";
import { BsMoon, BsSun } from "react-icons/bs";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const { user } = useUser();

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
      <nav className={styles.navbar}>
        {" "}
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/editor">Editor</Link>
          </li>
        </ul>
        <div className={styles.buttons}>
          <div className={styles.login}>
            {user ? (
              <button onClick={() => supabase.auth.signOut()}>Sign out</button>
            ) : (
              <Link href="/auth">Login/Signup</Link>
            )}
          </div>
          <button className={styles.Theme} onClick={toggleTheme}>
            {theme === "dark" ? <BsSun /> : <BsMoon />}{" "}
          </button>
        </div>
      </nav>
    </>
  );
}

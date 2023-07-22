import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Auth.module.css";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Navbar from "../components/navbar";

export default function Auth() {
  const [form, setForm] = useState("login"); // 'login' ou 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.authForm}>
        <div className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.divButtons}>
            {form === "login" ? (
              <button
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin(email, password);
                }}
                disabled={loading}
              >
                {loading ? "Loading" : "Log In"}
              </button>
            ) : (
              <button
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  handleSignUp(email, password);
                }}
                disabled={loading}
              >
                {loading ? "Loading" : "Sign Up"}
              </button>
            )}
            <button
              className={styles.Switch}
              onClick={(e) => {
                e.preventDefault();
                setForm(form === "login" ? "signup" : "login");
              }}
            >
              Switch to {form === "login" ? "Sign Up" : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

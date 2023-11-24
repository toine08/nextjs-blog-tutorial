import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import styles from "../styles/Auth.module.css";
import Layout from "../components/layout";
import toast, { Toaster } from "react-hot-toast";

export default function Auth() {
  const router = useRouter();
  const [form, setForm] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { theme } = router.query;

  const notify = () =>
    toast.success(
      "A confirmation email has been sent. Check your inbox and confirm to login.",
      {
        position: "top-right",
        style: {
          background: "green",
          color: "white",
        },
        duration: 3000,
        icon: "🚀",
      }
    );

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrors({});
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrors({ login: error.message });
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErrors({ signUp: error.message });
      setLoading(false);
    } else {
      router.push("/");
      notify();
    }
  };
  return (
    <Layout>
      <div className={styles.authForm}>
        <form onSubmit={form === "login" ? handleLogin : handleSignUp}>
          <h2>{form === "login" ? "Log In" : "Sign Up"}</h2>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>
          {form === "signup" && (
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className={styles.error}>{errors.confirmPassword}</span>
              )}
            </div>
          )}
          <div className={styles.endForm}>
            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Loading..." : form === "login" ? "Log In" : "Sign Up"}
            </button>
            <button
              className={styles.Switch}
              type="button"
              onClick={() => setForm(form === "login" ? "signup" : "login")}
            >
              Switch to {form === "login" ? "Sign Up" : "Log In"}
            </button>
            <button onClick={notify}>notify</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

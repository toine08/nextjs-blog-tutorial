import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { createProfil } from "../lib/profil";
import Layout from "../components/layout";
import styles from "../styles/Editor.module.css";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error.message);
    } else if (data) {
      setUser(data.session.user);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProfil(user.id, firstname, lastname, username);

      // Réinitialisez les champs du formulaire
      setFirstname("");
      setLastname("");
      setUsername("");
    } catch (error) {
      console.error("Failed to create a profil:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Profile</h1>
        <h2>email: {user ? user.email : ""}</h2>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstname">first name :</label>
              <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastname">last name :</label>
              <textarea
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="username">username :</label>
              <textarea
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <button className={styles.button} type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
///
/*
export default function Editor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    try {
      await createPost(title, content, formattedDate);

      // Réinitialisez les champs du formulaire
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };
  if (user) {
    return (
      <Layout>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="title">Title :</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="content">Content :</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button className={styles.button} type="submit">
              Save
            </button>
          </form>
        </div>
      </Layout>
    );
  } else {
    return <NotConnect />;
  }
}
*/

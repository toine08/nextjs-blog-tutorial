import { createPost } from "../lib/posts";
import { useState, memo, useEffect, useRef } from "react";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import styles from "../styles/Editor.module.css";
import { useUser } from "../pages/_app";
import Link from "next/link";
import NotConnect from "../components/notConnect";

//<Editor />;

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

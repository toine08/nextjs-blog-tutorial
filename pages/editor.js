import { createPost } from "../lib/posts";
import { useState } from "react";

export default function Editor() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    try {
      await createPost(title, content, formattedDate);

      // Réinitialisez les champs du formulaire
      setTitle("");
      setAuthor("");
      setContent("");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Nom d'auteur :</label>
        <input type="text" id="author" value={author} />
      </div>
      <div>
        <label htmlFor="content">Contenu :</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
}

//<Editor />;

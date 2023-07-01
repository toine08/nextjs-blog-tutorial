import { createPost } from "../lib/posts";

export default function TestComponent() {
  const handleSubmit = async () => {
    try {
      // Laissez vide pour que l'ID soit généré automatiquement
      const title = "Titre de l'article";
      const content = "Contenu de l'article";
      const postDate = new Date().toISOString();

      await createPost(title, content, postDate);

      console.log("Post created successfully");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div>
      <h1>Test Component</h1>
      <button onClick={handleSubmit}>Create Post</button>
    </div>
  );
}

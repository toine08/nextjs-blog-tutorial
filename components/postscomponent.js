import { useEffect, useState } from "react";
import utilStyles from "../styles/utils.module.css";
import { cookies } from "next/dist/client/components/headers";
import { getPosts } from "../lib/posts";
import BlogDate from "./date";
import Link from "next/link";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsData = await getPosts();
        console.log(postsData);
        setPosts(postsData);
        setLoading(false); //the data has been loaded.
      } catch (error) {
        console.error("failed to load posts:", error);
        setLoading(false); //the loading finished but with an error...
      }
    }

    fetchPosts();
  }, []);
  if (loading) {
    return <p className={utilStyles.loading}>Loading...</p>;
  } else {
    return (
      <div>
        {posts.map((data) => (
          <div key={data.id}>
            <Link href={`/posts/${data.id}`}>
              <h2 className={utilStyles.headingMd}>{data.title}</h2>
            </Link>
            <small>
              <BlogDate dateString={data.date} />
            </small>
            <hr></hr>
          </div>
        ))}
      </div>
    );
  }
}

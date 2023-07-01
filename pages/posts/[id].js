import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";
import BlogDate from "../../components/date";
import { getPostById } from "../../lib/posts";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Post() {
  const [post, setPost] = useState(null); // initialize post as null
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postData = await getPostById(id);
        console.log(postData);
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error("failed to load post content:", error);
        setLoading(false);
      }
    }

    if (id) {
      fetchPosts();
    }
  }, [id]);
  // check if post is loaded before rendering
  if (loading) {
    return (
      <Layout>
        <Head>
          <title>Loading...</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>Loading...</h1>
          <div className={utilStyles.lightText}></div>
          <div>Loading...</div>
        </article>
      </Layout>
    ); // or some loading spinner
  }

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <BlogDate dateString={post.date} />
        </div>
        <div>{post.content}</div>
      </article>
    </Layout>
  );
}

/*
<BlogDate dateString={post.date} />
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}*/

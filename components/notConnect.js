import Layout from "./layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

export default function NotConnect() {
  return (
    <Layout>
      <h2 className={utilStyles.headingLg}> You are not connected</h2>
      <div className={utilStyles.headingMd}>
        Please <Link href="/auth">connect your self</Link> before trying to
        creating a post.
      </div>
    </Layout>
  );
}

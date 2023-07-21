import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Posts from "../components/postscomponent";

function myAge() {
  const BORN = new Date("2000-07-31");
  var today = new Date();
  var diffInYears = today.getFullYear() - BORN.getFullYear();

  var monthBirthday = BORN.getMonth();
  var dayBirthday = BORN.getDay();

  var monthToday = today.getMonth();
  var dayToday = today.getDay();

  if (
    monthToday < monthBirthday ||
    (monthToday === monthBirthday && dayToday === dayBirthday)
  ) {
    diffInYears;
  }
  return diffInYears--;
}
export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div>
          <p>
            Hello, I am Toine (but you can call me <b>toto</b>) I am {myAge()}yo
            and I am a devops engineer. But I love learning new stuff and
            particulary programmation. Web Development is something I love and
            why not get a position some day as a developer.
          </p>
          <p>
            You can contact me on{" "}
            <a href="https://twitter.com/Toine0805" target="_blank">
              twitter
            </a>{" "}
            if you want.
          </p>
          <hr />
        </div>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog posts</h2>
        <Posts />
      </section>
    </Layout>
  );
}

/*export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}*/

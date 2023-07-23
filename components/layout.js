import Head from "next/head";
import styles from "../styles/layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Navbar from "./navbar";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children, home }) {
  const name = "togidoo blog";

  return (
    <div className={styles.container}>
      <Navbar />

      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="togidoo blog" />
        <meta
          property="og:image"
          content={
            "https://yfzehetlohzcenorunze.supabase.co/storage/v1/object/sign/togidoo.blog/img/card.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0b2dpZG9vLmJsb2cvaW1nL2NhcmQucG5nIiwiaWF0IjoxNjkwMTE5MTM2LCJleHAiOjE3MTAxMTkxMzZ9.YQHjVxMLSXeCcIjDHnf6MmMbcIgtPiF1JxGgnZ-ZJOw&t=2023-07-23T13%3A32%3A16.296Z"
          }
        />
        <meta name="og:title" content={name} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <nav className={styles.nav}></nav>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <h2 className={utilStyles.heading2Xl}>
              <Link href="/" className={utilStyles.heading2Xl}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>
        {children}
        <Analytics />
      </main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home </Link>
        </div>
      )}
    </div>
  );
}

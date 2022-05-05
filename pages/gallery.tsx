import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Gallery.module.css";

import { useState, useEffect } from "react";

import { usePicket } from "@picketapi/picket-react";
import { useRouter } from "next/router";

//The static content
const images = [
  "https://d113wk4ga3f0l0.cloudfront.net/c?o=eJw1jckOwiAYhN-Fc0tZ7GIfxGuD8LdFQAhLGmN8dzHqXCaTzHzzRMmXKGEx8EAzYh2f6GlgQ8cIHcnIBjrxnrCOVPF-oZwPbdteICahrYWEb2FDzR9yLdJArhzpHbZ623PKXhqsndhqtwTrhUo4RK-KzNrf6_R7vPbrys81HlrlHc3TmTRohw_iFzK4YEWGWj6qRSeiAUUoer0BDKg-EA==&s=8cf1f7196f11d90d319520508d9ccca97dbbee8e",
  "https://media.istockphoto.com/photos/historic-bodiam-castle-and-moat-in-east-sussex-picture-id1159222432?k=20&m=1159222432&s=612x612&w=0&h=b061l6yVknGCaWgqQ2wovC9QZ4GWD6U313RnLAojDbk=",
  "https://t3.ftcdn.net/jpg/02/90/36/94/360_F_290369428_lFZSlGFGl964s8Uy30eyxX0FLLKulwCN.jpg",
  "https://fallstonfence.com/wp-content/uploads/2019/06/wood-fence.jpeg",
].map((src) => (
  <Image
    key={src}
    className={styles.galleryImage}
    src={src}
    alt="Gates, gators, and pickets"
  />
));

const Gallery: NextPage = () => {
  const router = useRouter();

  const { isAuthenticated, authState, logout } = usePicket();

  const onLogout = async () => {
    await logout();
    router.push("/");
  };

  if (!isAuthenticated) {
    return <p> Hello, you don{"'"}t have access to view this page.</p>;
  }

  const { user } = authState;
  const { displayAddress } = user;

  return (
    <div className={styles.container}>
      <Head>
        <title>Picket Hello World</title>
        <meta name="description” content=“Saying hello to a web3 world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.headerContainer}>
          <h2 className={styles.welcomeHeader}>Hey {displayAddress}</h2>
          <button className={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        </div>
        <h3>
          In honor of your first token gate, check out these gates and gators.
        </h3>
        <div className={styles.gallery}>{images}</div>
      </main>
    </div>
  );
};

export default Gallery;

import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import { usePicket } from "@picketapi/picket-react";

import { useRouter } from "next/router";

const Header = () => (
  <Head>
    <title>Picket Gated Gallery</title>
    <meta name="description" content="Saying hello to a web3 world" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

// TODO: Replace with your requirements of choice!
const loginRequirements = {
  // Replace this example address with whichever contract you are verifying ownership for
  contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  // Replace with minimum balance you want to verify users' currently hold,
  // or omit if any number of tokens is sufficient
  minTokenBalance: 1,
};

const Home: NextPage = () => {
  const { isAuthenticating, isAuthenticated, error, login } = usePicket();

  const router = useRouter();

  useEffect(() => {
    // on login, redirect to gallery
    if (isAuthenticated) router.push("/gallery");
  }, [router, isAuthenticated]);

  // user is logging in
  if (isAuthenticating)
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.title}>Connecting...</h1>
        </main>
      </div>
    );

  // user is not logged in
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <h1 className={styles.title}>
            Sign-In with Your Wallet to View the Gallery
          </h1>
          <button
            className={styles.connectWalletButton}
            onClick={() => login(loginRequirements)}
          >
            Sign-In with Your Wallet
          </button>
          {error && (
            <p className={styles.error}>
              {"msg" in error ? error.msg : error.toString()}
            </p>
          )}
        </main>
      </div>
    );
  }

  // user is authenticated, so we should be redirecting to the gallery
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>Redirecting to the gallery...</h1>
      </main>
    </div>
  );
};

export default Home;

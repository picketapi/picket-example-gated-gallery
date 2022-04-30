import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import galleryStyles from '../styles/Gallery.module.css'

import { usePicket } from "@picketapi/picket-react";

import { useRouter } from "next/router";

const Header = () => (
  <Head>
    <title>Picket Gated Gallery</title>
    <meta name="description" content="Saying hello to a web3 world" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

const Home: NextPage = () => {
  const { isAuthenticating, isAuthenticated, authState, logout, login } =
    usePicket();

  const router = useRouter();

  const requirements = {
    // Replace this example address with whichever contract you are verifying ownership for
    contractAddress: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 
    // Replace with minimum balance you want to verify users' currently hold, 
    // or omit if any number of tokens is sufficient
    minTokenBalance: 1
  }

  const onLogout = async () => {
    try {
      await logout();
    } catch (err) {
		  //Error case
      console.error(err);
    }
  };

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
          <h1 className={styles.title}>Connect your wallet to login</h1>
          <button
            className={styles.connectWalletButton}
            onClick={() => login(requirements)}
          >
            Connect Wallet
          </button>
        </main>
      </div>
    );
  }

  router.push("/gallery");

  const { user } = authState;
  const { displayAddress } = user;
  const imageList = ["https://d113wk4ga3f0l0.cloudfront.net/c?o=eJw1jckOwiAYhN-Fc0tZ7GIfxGuD8LdFQAhLGmN8dzHqXCaTzHzzRMmXKGEx8EAzYh2f6GlgQ8cIHcnIBjrxnrCOVPF-oZwPbdteICahrYWEb2FDzR9yLdJArhzpHbZ623PKXhqsndhqtwTrhUo4RK-KzNrf6_R7vPbrys81HlrlHc3TmTRohw_iFzK4YEWGWj6qRSeiAUUoer0BDKg-EA==&s=8cf1f7196f11d90d319520508d9ccca97dbbee8e", "https://media.istockphoto.com/photos/historic-bodiam-castle-and-moat-in-east-sussex-picture-id1159222432?k=20&m=1159222432&s=612x612&w=0&h=b061l6yVknGCaWgqQ2wovC9QZ4GWD6U313RnLAojDbk=", "https://t3.ftcdn.net/jpg/02/90/36/94/360_F_290369428_lFZSlGFGl964s8Uy30eyxX0FLLKulwCN.jpg", "https://fallstonfence.com/wp-content/uploads/2019/06/wood-fence.jpeg"]

  return (
    <div className={galleryStyles.container}>
      <Head>
        <title>Picket Hello World</title>
        <meta name="description” content=“Saying hello to a web3 world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={galleryStyles.main}>
        <div className={galleryStyles.headerContainer}>
          <h2 className={galleryStyles.welcomeHeader}>Hey {displayAddress}</h2>
          <button className={galleryStyles.logoutButton} onClick={onLogout}>Logout</button>
        </div>
        <h3>In honor of your first token gate, check out these gates and gators.</h3>
        <div className={galleryStyles.gallery}>
            <img className={galleryStyles.galleryImage} src={imageList[0]} alt="" />
            <img className={galleryStyles.galleryImage} src={imageList[1]} alt="" />        
            <img className={galleryStyles.galleryImage} src={imageList[2]} alt="" />
            <img className={galleryStyles.galleryImage} src={imageList[3]} alt="" />
        </div>
      </main>
    </div>
  )

};

export default Home
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Picket from "@picketapi/picket-js";
const apiKey = "pk-your-key-goes-here"
const picket = new Picket(apiKey)

const Home: NextPage = () => {

  const onLogin = async () => {
    try {
      const loginObject = await picket.login();
      ///Do whatever you’d like to do after a successful login/
      location.href = "/gallery"
    } catch (err) {
		//Error case
      console.error(err);
    }
  };
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Picket Hello World</title>
        <meta name="description” content=“Saying hello to a web3 world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Connect your wallet to login
        </h1>
        <button className={styles.connectWalletButton} onClick={onLogin}>Connect Wallet</button>
      </main>
    </div>
  )
}

export default Home
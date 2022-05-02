import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Picket from "@picketapi/picket-js";
const apiKey = "pk_your_publishable_key_goes_here"
const picket = new Picket(apiKey)

import { defaultLoginRedirectCallback } from "@picketapi/picket-js";
import { useEffect } from "react";

const Home: NextPage = () => {

  const onLogin = async () => {
    try {
      await picket.login();
    } catch (err) {
		  //Error case
      console.error(err);
    }
  };

  useEffect(() => {
    async function handleRedirect () {
      try {
        const { appState } = await picket.handleLoginRedirect();
        defaultLoginRedirectCallback(appState);

        //Do anything after a successful login
        location.href = "/gallery"
      }catch(err){
        //Error case
        console.log(err)
      }
    }
  
    handleRedirect()
})
  
  
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
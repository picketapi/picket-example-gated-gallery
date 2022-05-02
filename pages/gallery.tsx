import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Gallery.module.css'

import { useState, useEffect } from "react";

import Picket from "@picketapi/picket-js";
const apiKey = "pk_52fd05e92f2b2f34e797ea8b34b8b47a"

const Gallery: NextPage = () => {

  const [displayAddress, setDisplayAddress] = useState("");
  const [imageList, setImageList] = useState([]);

  const picket = new Picket(apiKey)

  const onLogout = async () => {
    try {
      await picket.logout();
    } catch (err) {
		  //Error case
      console.error(err);
    }
  };

  useEffect(() => {
      async function checkAccessAndLoad(){
        const authState = await picket.authState();
        try{
          await picket.validate(authState.accessToken)
          setDisplayAddress(authState.user.displayAddress);
          setImageList(["https://d113wk4ga3f0l0.cloudfront.net/c?o=eJw1jckOwiAYhN-Fc0tZ7GIfxGuD8LdFQAhLGmN8dzHqXCaTzHzzRMmXKGEx8EAzYh2f6GlgQ8cIHcnIBjrxnrCOVPF-oZwPbdteICahrYWEb2FDzR9yLdJArhzpHbZ623PKXhqsndhqtwTrhUo4RK-KzNrf6_R7vPbrys81HlrlHc3TmTRohw_iFzK4YEWGWj6qRSeiAUUoer0BDKg-EA==&s=8cf1f7196f11d90d319520508d9ccca97dbbee8e", "https://media.istockphoto.com/photos/historic-bodiam-castle-and-moat-in-east-sussex-picture-id1159222432?k=20&m=1159222432&s=612x612&w=0&h=b061l6yVknGCaWgqQ2wovC9QZ4GWD6U313RnLAojDbk=", "https://t3.ftcdn.net/jpg/02/90/36/94/360_F_290369428_lFZSlGFGl964s8Uy30eyxX0FLLKulwCN.jpg", "https://fallstonfence.com/wp-content/uploads/2019/06/wood-fence.jpeg"])
        }catch{
          location.href="/";
        }
      }
      checkAccessAndLoad();
  })


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
          <button className={styles.logoutButton} onClick={onLogout}>Logout</button>
        </div>
        <h3>In honor of your first token gate, check out these gates and gators.</h3>
        <div className={styles.gallery}>
            <img className={styles.galleryImage} src={imageList[0]} alt="" />
            <img className={styles.galleryImage} src={imageList[1]} alt="" />        
            <img className={styles.galleryImage} src={imageList[2]} alt="" />
            <img className={styles.galleryImage} src={imageList[3]} alt="" />
        </div>
      </main>
    </div>
  )
}

export default Gallery
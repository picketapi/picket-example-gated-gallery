
# Picket Gated Gallery Example
For this example we’ll be using [Next.js](https://nextjs.org/). While few of the [Next.js](https://nextjs.org/) features are needed in this example tutorial, it will create a convenient launching off point for you to build on from this base. It also makes deployment easy through [Vercel](https://vercel.com/).

## 1. Create your Next.js app

In your terminal `cd` into the directory where you’d like your project folder to reside and enter the following into the terminal:
`npx create-next-app@latest —typescript`

Confirm your app is running on localhost by running
 `npm run dev`

Now, when you navigate to http://localhost:3000 in your browser you should see the following:

## 2. Install the Picket React SDK

```shell
npm install "@picketapi/picket-react"
```
## 3. Setup the Picket Provider

Replace the contents of `pages/_app.tsx` with the following:

```tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { PicketProvider } from "@picketapi/picket-react";

const apiKey = "YOUR_PUBLISHABLE_KEY_GOES_HERE";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PicketProvider apiKey={apiKey}>
      <Component {...pageProps} />
    </PicketProvider>
  );
}

export default MyApp
```

The `PicketProvider`  makes Picket and the user's authentication state available throughout your app via the `usePicket` hook.

## 4. Build your home page
Replace the contents of `pages/index.tsx` with the following:

```tsx
import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import galleryStyles from "../styles/Gallery.module.css";

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
  const { isAuthenticating, isAuthenticated, authState, logout, login } =
    usePicket();

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
          <h1 className={styles.title}>Connect your wallet to login</h1>
          <button
            className={styles.connectWalletButton}
            onClick={() => login(loginRequirements)}
          >
            Connect Wallet
          </button>
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
```

Replace the contents of Home.module.css with the following:
```css
.container {
  padding: 0 2rem;
}

.main {
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  color: black;
  padding-bottom: 20px;
}

.connectWalletButton{
  border-style: none;
  background-color: #5469d4;
  width: 200px;
  padding: 20px;
  border-radius: 50px;

  color: white;
  font-weight: 800;
}
```

When you navigate to http://localhost:3000 in your browser you should see the following:

![image](https://picket-static-files.s3.amazonaws.com/login-home.png)

## 5. Build the token-gated gallery page
Now, let's create the page that will only be accessible to those who verify token ownership of the required ERC20, ERC721, or ERC1155 token(s). For the purposes of this demo we are token-gate a photo gallery; however this page could be anything you want. It could be a live video stream, exclusive merchandise, or whatever else you dream up!

Create a new file  `pages/gallery.tsx`

Place the following code into `pages/gallery.tsx`. It renders 5 photos we picked from across the internet for this example.

```tsx
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
```

Create a file called Gallery.module.css and place the following css inside:
```css
.container {
    padding: 0 2rem;
  }
  
.main {
    min-height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.welcomeHeader{
    word-wrap: break-word;
    max-width: 90vw;
}

.gallery{
    display: grid;
    grid-template-columns: 45vw 45vw;
}

.galleryImage{
    height: 45vw;
    width: 45vw;
}

.headerContainer{
    width: 100vw;
    padding-left: 80px;
    padding-right: 80px;
    display: flex;
    justify-content: space-between;
}

.logoutButton{
    border-style: none;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 20px;

    border-radius: 40px;

    font-size: 14px;
    font-weight: 500;
}
```

This page will be available at http://localhost:3000/gallery, but to access it, we need to setup [Picket](https://picketapi.com/).

![image](https://picket-static-files.s3.amazonaws.com/gallery-unknown-wallet.png)

## 6. Let's make it real!
Now on to the juicy stuff. Let’s make the connect wallet button functional. Navigate to your [Picket account dashboard](https://picketapi.com/dashboard) and copy your publishable key from a project. Now paste it into the `pages/_app.tsx`

```tsx
// in pages/_app.tsx
// Replace with your copied publishable key
const apiKey = "YOUR_PUBLISHABLE_KEY_GOES_HERE";
```

## 7. Whitelist our app's redirect URI

Go back to your [Picket account dashboard](https://picketapi.com/dashboard) and click `Edit` on your project. Add the following redirect URI
- http://localhost:3000/ (trailing slash matters!)

After adding the redirect URI for our app, click the `Save` button to save your changes to the project. Nice! Now we are ready to add token ownership requirements.

## 8. Add Token Ownership Requirements

To enforce token ownership, we pass the requirements to the [login](https://docs.picketapi.com/picket-docs/reference/libraries-and-sdks/javascript-library-picket-js#login) function. For this tutorial, we will use [CryptoKitties](https://opensea.io/collection/cryptokitties)) to token-gate our gallery. Users will need to own at least one CryptoKitty NFT token to access the gallery page. Picket works with any ERC-20, ERC-721 or ERC-1155 token on the `ethereum-mainnet` .  You'll want to pick a token contract that your wallet owns to test out the token-gating functionality yourself.

The contract address for CryptoKitties is: `0x06012c8cf97BEaD5deAe237070F9587f8E7A266d`

If you’re not sure what the contract address is for your token is, [Etherscan](https://etherscan.io/) is a great resource. It'll give you information about any ERC-20, ERC-721, ERC-1155 token.

Now, let's update the login (aka token ownership) requirements in `pages/index.tsx`

```ts
// at the top of pages/index.tsx
// TODO: Replace with your requirements of choice!
const loginRequirements = {
  // Replace this example address with whichever contract you are verifying ownership for
  contractAddress: "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d",
  // Replace with minimum balance you want to verify users' currently hold,
  // or omit if any number of tokens is sufficient
  minTokenBalance: 1,
};
```
`minTokenBalane` lets us not only verify token ownership, but require a minimum amount of tokens. 

## 9. Try it out!
Now, when you run `npm run dev` from the command line and navigate to http://localhost:3000 in your browser you should have a working app that lets you tap on the “Connect Wallet” button to initiate a signing request and verify your wallet and token ownership.

If all goes well, and you meet the token ownership requirements, you'll see the following page: 

![image](https://picket-static-files.s3.amazonaws.com/gallery-noahfradin.png)
 

Congratulations! You’ve created a fully functional token gated gallery that is only accessible to users who have the necessary token. You can token gate any page or APIs using these same methods.

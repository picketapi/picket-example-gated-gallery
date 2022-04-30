# Picket Gated Gallery Example
For this example we’ll be using next.js. While few of the next.js features are needed in this example tutorial, it will create a convenient launching off point for you to build on from this base. It also makes deployment easy through vercel.

1. *Create your next.js app.*<br>
In your terminal `cd` into the directory where you’d like your project folder to reside and enter the following into the terminal:
`npx create-next-app@latest —typescript`

Confirm your app is running on localhost by running
 `npm run dev`

Now, when you navigate to `localhost:3000` in your browser you should see the following:

2. Build your home page<br>
Replace the contents of index.tsx with the following:

```tsx
import type { NextPage } from ‘next’
import Head from ‘next/head’
import styles from ‘../styles/Home.module.css’

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Picket Hello World</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Connect your wallet to login
        </h1>
        <button className={styles.connectWalletButton}>Connect Wallet</button>
      </main>
    </div>
  )
}

export default Home
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

When you navigate to localhost:3000 in your browser you should see the following:

![image](https://picket-static-files.s3.amazonaws.com/login-home.png)

3. Build the gallery page<br>
Next up is creating the page that will only be accessible to those who verify token ownership of the token that you decide to require. For the purposes of this demo we are token gating a photo gallery, however this page could be anything you want to be behind a token gate and after completion it will only be accessible to those who have the required token.

Create a new file called `gallery.tsx`

Place the following code into `gallery.tsx`. It renders 5 photos we picked from across the internet for this example.

```js
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Gallery.module.css'

import { useState, useEffect } from "react";

import Picket from "@picketapi/picket-js";
const apiKey = "pk_your_publishable_key_goes_here"

const Gallery: NextPage = () => {

  const [displayAddress, setDisplayAddress] = useState("");
  const [imageList, setImageList] = useState([]);

  const picket = new Picket(apiKey)

  useEffect(() => {
        setDisplayAddress("unknown user");
    setImageList(["https://d113wk4ga3f0l0.cloudfront.net/c?o=eJw1jckOwiAYhN-Fc0tZ7GIfxGuD8LdFQAhLGmN8dzHqXCaTzHzzRMmXKGEx8EAzYh2f6GlgQ8cIHcnIBjrxnrCOVPF-oZwPbdteICahrYWEb2FDzR9yLdJArhzpHbZ623PKXhqsndhqtwTrhUo4RK-KzNrf6_R7vPbrys81HlrlHc3TmTRohw_iFzK4YEWGWj6qRSeiAUUoer0BDKg-EA==&s=8cf1f7196f11d90d319520508d9ccca97dbbee8e", "https://media.istockphoto.com/photos/historic-bodiam-castle-and-moat-in-east-sussex-picture-id1159222432?k=20&m=1159222432&s=612x612&w=0&h=b061l6yVknGCaWgqQ2wovC9QZ4GWD6U313RnLAojDbk=", "https://t3.ftcdn.net/jpg/02/90/36/94/360_F_290369428_lFZSlGFGl964s8Uy30eyxX0FLLKulwCN.jpg", "https://fallstonfence.com/wp-content/uploads/2019/06/wood-fence.jpeg"])
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
        <h3>"In honor of your first token gate, check out these gates and gators."</h3>
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

If you navigate to `localhost:3000/gallery` in your browser while `npm run dev` is running in your terminal you should see the following in your browser:

![image](https://picket-static-files.s3.amazonaws.com/gallery-unknown-wallet.png)

4. Install Picket<br>
Now on to the juicy stuff. Let’s make the connect wallet button functional. First thing to do is to install the picket-js library. In your terminal, from within your project directory first make sure you are no longer running your local server by typing `ctrl + c` if you haven’t already.  Then type the following into your terminal: 
`npm install --save @picketapi/picket-js`

5. Set up the Picket Library in your project<br>
Once picket is successfully installed you can import it within your `index.tsx` file by putting the following import statement at the top of your `index.tsx` file and creating a picket object with your api key that you can get from the *dashboard*:

```js
import Picket from "@picketapi/picket-js";
const picket = new Picket("your-api-key-goes-here")
```

6. Set up the “connect wallet” button to log in users with picket and token gate the gallery<br>

Now that you have the picket library installed, the magic method to verify a users’ wallet is the following: 
```tsx
await picket.login()
```

To verify token ownership we simply need to pass in the contract address of the token that we’d like to ensure users have as well as the minimum balance we want to ensure users have of the token. For the purposes of this demo we’ll be using cryptokitties ([CryptoKitties - Collection | OpenSea](https://opensea.io/collection/cryptokitties)) as the token users must have to enter the gallery page. However, you can use any ERC-20, ERC-721 or ERC-1155 token when using the `ethereum-mainnet`  chain that picket defaults to.

The contract address for cryptokitties is: `0x06012c8cf97BEaD5deAe237070F9587f8E7A266d`

If you’re not sure what the contract address is for your token of interest, etherscan ([Ethereum (ETH) Blockchain Explorer](https://etherscan.io/)) is a great resource where you can search for your token of interest and get the contract address among many other pieces of data.

To verify token ownership it’s as simple as updating the login function to take in the contract address and minBalance like so: 

```js
await picket.login({
	contractAddress: "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d",
	minTokenBalance: 1
})
```

This not only verifies ownership of the wallet, but also checks to ensure the wallet has a minimum of one token from the cryptokitties contract (`0x06012c8cf97BEaD5deAe237070F9587f8E7A266d`.)

Let’s wrap that method in a function you can call from the “Connect Wallet” button. Still within `index.ts`, place the following within the function for the `NextPage` titled `Home`, above the return statement.
```tsx
const onLogin = async () => {
    try {
      const loginObject = await picket.login({
			contractAddress: "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d",
			minTokenBalance: 1
		});
      ///Do whatever you’d like to do after a successful login and token ownership validation
      location.href = "/gallery"
    } catch (err) {
    	//Error case
    	console.error(err);
    }
  };

```

And then within the html declaration of the “Connect Wallet” button, update it with an onclick event that calls the above method like so: 
```html
<button className={styles.connectWalletButton} onClick={onLogin}>Connect Wallet</button>
```

After this, your index.tsx file should look like this:
```tsx
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Picket from "@picketapi/picket-js";
const apiKey = "pk_your_publishable_key_goes_here"
const picket = new Picket(apiKey)

const Home: NextPage = () => {

  const onLogin = async () => {
    try {
      const loginObject = await picket.login({
			contractAddress: "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d",
			minTokenBalance: 1
		});
      ///Do whatever you’d like to do after a successful login and token ownership validation
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
```

7. Try it out<br>
Now, when you run `npm run dev` from the command line and navigate to `localhost:3000` in your browser you should have a working app that lets you tap on the “Connect Wallet” button to initiate a signing request and verify your wallet and token ownership.

Assuming you’re in a browser with Metamask installed, when you click on “Connect Wallet” you should now see the following: 

![image](https://picket-static-files.s3.amazonaws.com/home-signature-request.png)

And when you click sign, you should be redirected to `localhost:3000/gallery` if and only if you have the minimum balance of of the tokens you specified. 

The wallet address, display address (ex. ENS name) and access token are returned by the `picket.login()` method in the following format:
```json
{
    accessToken: "ACCESS_TOKEN",
    user: {
        walletAddress: "0xWALLET_ADDRESS",
		  displayAddress: "ENS_NAME"
    }
}
```

The returned access token can now be used for the *lifetime of the access token* to *validate* a user’s wallet and token ownership without needing to ask the user to sign another request. However, right now we’re not doing anything with the access token and `localhost:3000/gallery` can be accessed by anyone who knows the url. 

Next up, we’ll ensure that the `/gallery` page is only accessible to those with a valid access token that proves they have ownership of the necessary tokens in their verified wallet.

8. Restricting the gallery page to token holders<br>

Now that you’re receiving an access token when a user signs in with their wallet and verifies ownership of your token of interest (at least 1 cryptokitty in this example,) we can restrict access to the gallery on the basis of having a valid access token that meets our token ownership requirements. 

To do this we use the `picket.validate()` function. This functions validates the access token is in fact a valid picket access token that was issued specifically for your project and that it meets any requirements that you provided. 

Navigate back to the `gallery.tsx` file. and find the section where we’re using useEffect() to set the displayName and image list on the client side. Replace the contents of UseEffect() so that it looks like this:   
```js
     useEffect(() => {
      async function checkAccessAndLoad(){
        try{
          await picket.validate(loginObject.accessToken, "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d", 1)
        }catch{
          location.href="/";
        }
      }
      checkAccessAndLoad();
  })
```

This code gets the picket  response object that was stored in local storage by the picket-js library and stores it as loginObject with this line: 
```ts
const loginObject = JSON.parse(localStorage.getItem("_picketauth"))
```

It then tries to validate the accessToken and the token ownership requirements by calling:
```ts
await picket.validate(loginObject.accessToken, "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d", 1)
```

If picket is unable to validate the access token, or if the user doesn’t have an access token it kicks them back out to the home login page.

Next up is to load the content only once a user has proven they have a validated access token. And we can personalize the experience based on the connected wallet by fetching the user’s display name from 
`loginObject.user.displayAddress`  and displaying that to the user. In this example we will display the images and update the header to welcome the user with their displayName (ENS or walletAddress depending on what the wallet has set up) after we have validated the access token so that the final useEffect method should look like this: 
```ts
        setDisplayAddress(loginObject.user.displayAddress);
        setImageList(["https://d113wk4ga3f0l0.cloudfront.net/c?o=eJw1jckOwiAYhN-Fc0tZ7GIfxGuD8LdFQAhLGmN8dzHqXCaTzHzzRMmXKGEx8EAzYh2f6GlgQ8cIHcnIBjrxnrCOVPF-oZwPbdteICahrYWEb2FDzR9yLdJArhzpHbZ623PKXhqsndhqtwTrhUo4RK-KzNrf6_R7vPbrys81HlrlHc3TmTRohw_iFzK4YEWGWj6qRSeiAUUoer0BDKg-EA==&s=8cf1f7196f11d90d319520508d9ccca97dbbee8e", "https://media.istockphoto.com/photos/historic-bodiam-castle-and-moat-in-east-sussex-picture-id1159222432?k=20&m=1159222432&s=612x612&w=0&h=b061l6yVknGCaWgqQ2wovC9QZ4GWD6U313RnLAojDbk=", "https://t3.ftcdn.net/jpg/02/90/36/94/360_F_290369428_lFZSlGFGl964s8Uy30eyxX0FLLKulwCN.jpg", "https://fallstonfence.com/wp-content/uploads/2019/06/wood-fence.jpeg"])
```

Your final `gallery.tsx` file should now look like this: 
```tsx
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Gallery.module.css'

import { useState, useEffect } from "react";

import Picket from "@picketapi/picket-js";
const apiKey = "pk_your_key_goes_here"

const Gallery: NextPage = () => {

  const [displayAddress, setDisplayAddress] = useState("");
  const [imageList, setImageList] = useState([]);

  const picket = new Picket(apiKey)

  useEffect(() => {
      async function checkAccessAndLoad(){
        const loginObject = JSON.parse(localStorage.getItem("_picketauth"))
        try{
          await picket.validate(loginObject.accessToken)
        }catch{
          location.href="/";
        }
        setDisplayAddress(loginObject.user.displayAddress);
        setImageList(["https://d113wk4ga3f0l0.cloudfront.net/c?o=eJw1jckOwiAYhN-Fc0tZ7GIfxGuD8LdFQAhLGmN8dzHqXCaTzHzzRMmXKGEx8EAzYh2f6GlgQ8cIHcnIBjrxnrCOVPF-oZwPbdteICahrYWEb2FDzR9yLdJArhzpHbZ623PKXhqsndhqtwTrhUo4RK-KzNrf6_R7vPbrys81HlrlHc3TmTRohw_iFzK4YEWGWj6qRSeiAUUoer0BDKg-EA==&s=8cf1f7196f11d90d319520508d9ccca97dbbee8e", "https://media.istockphoto.com/photos/historic-bodiam-castle-and-moat-in-east-sussex-picture-id1159222432?k=20&m=1159222432&s=612x612&w=0&h=b061l6yVknGCaWgqQ2wovC9QZ4GWD6U313RnLAojDbk=", "https://t3.ftcdn.net/jpg/02/90/36/94/360_F_290369428_lFZSlGFGl964s8Uy30eyxX0FLLKulwCN.jpg", "https://fallstonfence.com/wp-content/uploads/2019/06/wood-fence.jpeg"])
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
        <h1 className={styles.welcomeHeader}>Hey {displayAddress}</h1>
        <h2>In honor of your first token gate, check out these gates and gators.</h2>
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

export default Home

```

9. Test it out<br>
When you go to `localhost:3000/` while `npm run dev` is still running in the terminal you should see the home page prompting you to connect your wallet. Connecting your wallet and signing the message should verify your wallet. If you don’t have the required tokens you won’t be granted access. If you do, you’ll be redirected to `localhost:3000/gallery`  where you should see this: 
![image](https://picket-static-files.s3.amazonaws.com/gallery-noahfradin.png)
 
10. Implement logout<br>
Picket makes logging out and properly handling the associated cached user information incredibly easy. All you have to do is call `picket.logout()`

To build this into our project, first navigate to `gallery.tsx` in your code editor.  Once there, let’s wrap the `picket.logout()` method in a function you can call from the “Logout” button easily. Add the following which we placed above the useEffect() function for readability:

```tsx
const onLogout = async () => {
    try {
      await picket.logout();
    } catch (err) {
      //Error case
      console.error(err);
    }
  };
```

Then, find the logout button in the same `gallery.tsx` file:
```tsx
<button className={styles.logoutButton}>Logout</button>
```
Add `onLogout` as an `onClick` event like so:
```tsx
<button className={styles.logoutButton} onClick={onLogout}
>Logout</button>
```

After this your `gallery.tsx` file should look like this:
```tsx
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Gallery.module.css'

import { useState, useEffect } from "react";

import Picket from "@picketapi/picket-js";
const apiKey = "pk_your_publishable_key_goes_here"

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
        const loginObject = JSON.parse(localStorage.getItem("_picketauth"))
        try{
          await picket.validate(loginObject.accessToken)
        }catch{
          location.href="/";
        }
        setDisplayAddress(loginObject.user.displayAddress);
        setImageList(["https://d113wk4ga3f0l0.cloudfront.net/c?o=eJw1jckOwiAYhN-Fc0tZ7GIfxGuD8LdFQAhLGmN8dzHqXCaTzHzzRMmXKGEx8EAzYh2f6GlgQ8cIHcnIBjrxnrCOVPF-oZwPbdteICahrYWEb2FDzR9yLdJArhzpHbZ623PKXhqsndhqtwTrhUo4RK-KzNrf6_R7vPbrys81HlrlHc3TmTRohw_iFzK4YEWGWj6qRSeiAUUoer0BDKg-EA==&s=8cf1f7196f11d90d319520508d9ccca97dbbee8e", "https://media.istockphoto.com/photos/historic-bodiam-castle-and-moat-in-east-sussex-picture-id1159222432?k=20&m=1159222432&s=612x612&w=0&h=b061l6yVknGCaWgqQ2wovC9QZ4GWD6U313RnLAojDbk=", "https://t3.ftcdn.net/jpg/02/90/36/94/360_F_290369428_lFZSlGFGl964s8Uy30eyxX0FLLKulwCN.jpg", "https://fallstonfence.com/wp-content/uploads/2019/06/wood-fence.jpeg"])
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

```


11. Try it out!<br>
Now, when you navigate to `localhost:3000/gallery` within your browser and click logout you should be taken to the home login page. After logging out, if you then try going to  `localhost:3000/gallery` by typing that into your browser address bar you will again be kicked out back to the home login page because you are not authenticated and authorized. If you try logging in with a wallet that doesn’t have the necessary tokens and token balance you’ll see the same result.

Only logging in with a wallet that has the necessary token balance that you required (in this example that is 1 cryptokitty) will be able to see the gallery. 

Congratulations! You’ve created a fully functional token gated gallery that is only accessible to users who have the necessary token. You can token gate any page using these same methods. 

Check out our other examples to see how you can token gate api endpoints in order to token gate resources themselves. This can be paired with this technique for added security or done on its own to token gate any api endpoint.
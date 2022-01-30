import React ,{ useEffect } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import ConnectButton from './components/connectButton';
import './App.css';



// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

  const checkIfWalletIsConnected = async() => {
    try {
      const {solana} = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("👻 Phantom wallet found!")

          // The solana object gives us a function that will let us connect to our wallet
          const res = await solana.connect({ onlyIfTrusted: true });

          console.log(`Connected with Public Key: ${res.publicKey.toString()}`);
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const onLoad = async() => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">👾 Anime Post Board 👾</p>
          <p className="sub-text">
            View your Anime collection in the metaverse ✨
          </p>
          <ConnectButton />
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;

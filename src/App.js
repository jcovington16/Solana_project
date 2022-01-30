import React ,{ useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
// import ConnectButton from './components/ConnectButton';
//import Test_Gifs from './components/Test_Gifs';
import './App.css';



// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [

  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
  'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp'
]

const App = () => {
  // Setting State
  const [walletAddress, setWalletAddress] = useState(null)

  const checkIfWalletIsConnected = async() => {
    try {
      const {solana} = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("👻 Phantom wallet found!")

          // The solana object gives us a function that will let us connect to our wallet
          const res = await solana.connect({ onlyIfTrusted: true });

          // Setting the user's publicKey in state to be used at a later time
          setWalletAddress(res.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.log(error)
    }
  };

  // Will connect this with the ConnectButton component.

  const connectWallet = async () => {
    const {solana} = window;

    if (solana) {
      const res = await solana.connect();
      console.log(`Connected with Public Key: ${res.publicKey.toString()}`);
      setWalletAddress(res.publicKey.toString());
    }
  }

  const renderNotConnectedContainer = () => (
    <button className='cta-button connect-wallet-button' onClick={() => connectWallet()}>Connect to Phantom Wallet</button>
  );

  const renderConnectedContainer = () => (
    <div className='connected-container'>
      <div className="gif-grid">
          {TEST_GIFS.map(gif => (
              <div className="gif-item" key={gif}>
                  <img src={gif} alt={gif} />
              </div>
          ))}
      </div>
    </div>
  );

  useEffect(() => {
    const onLoad = async() => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">👾 Anime Post Board 👾</p>
          <p className="sub-text">
            View your Anime collection in the metaverse 🚀
          </p>
          {/* will add this to the ConnectWallet Component in order to clean App.js up */}
          {!walletAddress && renderNotConnectedContainer()}
          {/* Add the inverse here */}
          {walletAddress && renderConnectedContainer()}
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

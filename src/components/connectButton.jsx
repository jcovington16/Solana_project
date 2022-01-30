import React from 'react';
import '../App.css';

const ConnectButton = () => {
    const connectWallet = async () => {}

    // const renderNotConnectedContainer = () => {
    //     <button className='cta-button connect-wallet-button' onClick={connectWallet}>
    //     Connect to Wallet
    //   </button>
    // }

  return (
  <div>
      {/* {renderNotConnectedContainer()} */}
      <button className='cta-button connect-wallet-button' onClick={connectWallet}>
        Connect to Phantom Wallet
      </button>
  </div>);
}

export default ConnectButton;

import React from 'react';

const ConnectButton = () => {
    const connectWallet = async () => {}

    const renderNotConnectedContainer = () => {
        <button className='cta-button connect-wallet-button' onClick={connectWallet}>
        Connect to Wallet
      </button>
    }

  return (
  <div>
      {renderNotConnectedContainer()}
  </div>);
}

export default ConnectButton;

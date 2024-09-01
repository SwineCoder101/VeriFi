import React from 'react';

const Home: React.FC = () => {
  return (
    <div style={containerStyle}>
      <main style={mainStyle}>
        <h2>Decentralized Reviewing Platform</h2>
        <p>
          Welcome to VerFi, a cutting-edge platform where companies build their
          reputation on the blockchain. Our decentralized reviewing system ensures
          that all feedback and ratings are secure, transparent, and immutable.
        </p>
        <p>
          Users are incentivized with tokens for providing reviews and verifying
          attestations linked to their LinkedIn data. Join us in revolutionizing
          the way reputation is managed in the digital age.
        </p>
      </main>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  padding: '50px 20px',
  backgroundColor: 'black',
  textAlign: 'center',
};

export default Home;
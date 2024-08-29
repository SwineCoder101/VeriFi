import React from 'react';
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { connectToLinkedin } from './web3auth';
import Web3AuthComponent from '@/components/Web3AuthComponent';


const Home: React.FC = () => {

  return (
    <div>
      <header style={headerStyle}>
        <h1>VerFi</h1>
        <nav>
          <a href="#features" style={linkStyle}>Features</a>
          <a href="#about" style={linkStyle}>About</a>
          <a href="#contact" style={linkStyle}>Contact</a>
          {/* <button style={buttonStyle} onClick={connectToLinkedin}>Connect LinkedIn</button> */}
          <Web3AuthComponent />
          <a href="/api/auth/login">Login</a>
        </nav>
      </header>
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
      <footer style={footerStyle}>
        <p>© 2024 VerFi. All rights reserved.</p>
      </footer>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#0077b5',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

const headerStyle: React.CSSProperties = {
  backgroundColor: '#282c34',
  padding: '20px',
  color: 'white',
  textAlign: 'center',
};

const linkStyle: React.CSSProperties = {
  color: 'white',
  margin: '0 15px',
  textDecoration: 'none',
  fontWeight: 'bold',
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  padding: '50px 20px',
  backgroundColor: 'white',
  textAlign: 'center',
};

const footerStyle: React.CSSProperties = {
  backgroundColor: '#282c34',
  padding: '10px',
  color: 'white',
  textAlign: 'center',
};

export default Home;

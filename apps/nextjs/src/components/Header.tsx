"use client"; // Add this directive at the top

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/Web3AuthContext';

const Header = () => {
  const router = useRouter();
  const { connectToProvider, isConnected, logout, walletDetails } = useAuth();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  const handleConnect = async () => {
    await connectToProvider('linkedin');
    navigateTo('/profileme');
  };

  const handleLogout = async () => { 
    await logout();
    navigateTo('/');
  };

  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        {isConnected && (
        <>
            <button style={styles.tab} onClick={() => navigateTo('/profileme')}>
                Profile
            </button>
            <button style={styles.tab} onClick={() => navigateTo('/explore')}>
                Explore
            </button>
            <div style={styles.walletBalance}>
              Vault: {walletDetails?.balance} USDC
            </div>
            <div style={styles.walletBalance}>
              Wallet: {walletDetails?.balance} USDC
            </div>
            <button style={styles.connectButton} onClick={handleLogout}>
                Logout
            </button>
        </>
        )}
        {!isConnected && (
          <button style={styles.connectButton} onClick={handleConnect}>
            Connect LinkedIn
          </button>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#343a40',
    padding: '10px 20px',
    borderBottom: '1px solid #dee2e6',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#007bff',
  },
  connectButton: {
    backgroundColor: '#007bff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#fff',
    borderRadius: '5px',
  },
  walletBalance: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#28a745',
  },
};

export default Header;
"use client"; // Add this directive at the top
import React, { createContext, useContext, ReactNode } from 'react';
import useWeb3Auth, { AuthData, WalletDetails } from '../hooks/useWeb3Auth';
import { UserInfo } from '@web3auth/base';
import { OpenloginUserInfo } from '@web3auth/openlogin-adapter';

interface AuthContextType {
  isConnected: boolean;
  connectToProvider: (provider: "google" | "linkedin" | "github" | "twitter") => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<Partial<OpenloginUserInfo> | null>;
  getBalance: () => Promise<string | null>;
  signMessage: (message: string) => Promise<string | null>;
  getLinkedinProfile: (user: AuthData) => Promise<any>;
  userInfo: Partial<UserInfo> | null;
  getAccounts: () => Promise<string[] | null>;
  walletDetails: WalletDetails | undefined;
  setWalletDetails: React.Dispatch<React.SetStateAction<WalletDetails | undefined>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Web3AuthContextProps {
  children: ReactNode;
}

export const Web3AuthContext: React.FC<Web3AuthContextProps> = ({ children }) => {
  const {
    connectToProvider,
    logout,
    getUserInfo,
    getBalance,
    signMessage,
    getLinkedinProfile,
    isConnected,
    userInfo,
    getAccounts,
    walletDetails,
    setWalletDetails,
  } = useWeb3Auth();

  return (
    <AuthContext.Provider value={{ isConnected, connectToProvider, logout, getUserInfo, getBalance, signMessage, getLinkedinProfile, userInfo, getAccounts,walletDetails, setWalletDetails}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

"use client"; // Add this directive at the top

import React, { useEffect, useState } from 'react';
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import Web3 from "web3";
import axios from 'axios';
import { EvmChains, SignProtocolClient, SpMode } from '@ethsign/sp-sdk';
import { privateKeyToAccount } from "viem/accounts";

const clientId = "BNCvQyULuzhMGwxZpWfXWU2O72CAkYmCm63jqoolVeHdohBOoPymZgalUjx2K9pV0PR_bBPm47yiwdUC5ff4iv8";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x14a34",
  rpcTarget: "https://base-sepolia.g.alchemy.com/v2/pkHx6pj0u2G76QD14i_eIH91oYZAsXqc",
  displayName: "Base Sepolia",
  blockExplorerUrl: "https://base-sepolia.blockscout.com/",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/ethereum.svg",
};

export interface AuthData {
  aggregateVerifier: string;
  appState: string;
  dappShare: string;
  idToken: string;
  isMfaEnabled: boolean;
  name: string;
  oAuthAccessToken: string;
  oAuthIdToken: string;
  profileImage: string;
  typeOfLogin: string;
  verifier: string;
  verifierId: string;
}

export interface WalletDetails {
    address: string;
    balance: string;
}

const useWeb3Auth = () => {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [userInfo, setUserInfo] = useState<Partial<AuthData> | null>(null);
  const [walletDetails, setWalletDetails] = useState<WalletDetails>();
  const [signClient, setSignClient] = useState<any>();

  useEffect(() => {
    const initializeWeb3Auth = async () => {
      const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

      const web3authInstance = new Web3AuthNoModal({
        clientId,
        web3AuthNetwork: "sapphire_devnet",
        privateKeyProvider: privateKeyProvider,
      });

      const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
          loginConfig: {
            google: {
              verifier: "verifi-social-login-verifier",
              verifierSubIdentifier: "google-auth0",
              typeOfLogin: "jwt",
              clientId: "owkYMjf1pI4NHNOxVB7m0uto88lHQDsA",
            },
            linkedin: {
              verifier: "verifi-social-login-verifier",
              verifierSubIdentifier: "linkedin-auth0",
              typeOfLogin: "jwt",
              clientId: "owkYMjf1pI4NHNOxVB7m0uto88lHQDsA",
            },
            github: {
              verifier: "verifi-social-login-verifier",
              verifierSubIdentifier: "github-auth0",
              typeOfLogin: "jwt",
              clientId: "owkYMjf1pI4NHNOxVB7m0uto88lHQDsA",
            },
            twitter: {
              verifier: "verifi-social-login-verifier",
              verifierSubIdentifier: "twitter-auth0",
              typeOfLogin: "jwt",
              clientId: "owkYMjf1pI4NHNOxVB7m0uto88lHQDsA",
            },
            emailpasswordless: {
              verifier: "verifi-social-login-verifier",
              verifierSubIdentifier: "email-pw-auth0",
              typeOfLogin: "jwt",
              clientId: "owkYMjf1pI4NHNOxVB7m0uto88lHQDsA",
            },
          },
        },
        privateKeyProvider,
      });

      web3authInstance.configureAdapter(openloginAdapter);
      await web3authInstance.init();
      
      if (web3authInstance.status === ADAPTER_EVENTS.CONNECTED) {
          setIsConnected(true);
          setUserInfo(await web3authInstance.getUserInfo());
          await getWalletDetails();
      }
        
        setWeb3auth(web3authInstance);

    };

    const initializeSignClient = async () => {
      const privateKey = `0x${process.env.NEXT_PUBLIC_PRIVATE_KEY}` as `0x${string}`;
      const client = new SignProtocolClient(SpMode.OnChain, {
        chain: EvmChains.baseSepolia,
        account: privateKeyToAccount(privateKey),
      });
      setSignClient(client);
    };

    initializeSignClient();
    initializeWeb3Auth();

  }, []);

  const connectToProvider = async (providerName: "google" | "linkedin" | "github" | "twitter") => {
    if (!web3auth) return;
    try {
      
      const provider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: providerName,
        extraLoginOptions: {
          domain: "https://dev-2uegducfnv75kjbo.us.auth0.com",
          verifierIdField: providerName === "google" ? "email" : "sub",
          connection: providerName,
        },
      });
      setProvider(provider);

      if (web3auth.status === ADAPTER_EVENTS.CONNECTED) {
        setIsConnected(true);
        setWeb3auth(web3auth);
        setUserInfo(await web3auth.getUserInfo());
        const walletDetails = await getWalletDetails() as WalletDetails;
        setWalletDetails(walletDetails);
      }
    } catch (error) {
      console.error("Failed to connect with openlogin provider", error);
    }
  };

  const logout = async () => {
    if (!web3auth) return;
    await web3auth.logout();
    setWeb3auth(null);
    setIsConnected(false);
    setProvider(null);
    console.log("logged out");
  };

  const getLinkedinProfile = async (user: AuthData) => {
    if (!user?.oAuthAccessToken) return null;
    try {
      const response = await axios.get("/api/proxy/v2/me", {
        headers: {
          Authorization: `Bearer ${user.oAuthAccessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get linkedin profile", error);
      return null;
    }
  };

  const getUserInfo = async () => {
    if (!web3auth) return null;
    const user = await web3auth.getUserInfo();
    console.log(user);
    return user;
  };

  const getBalance = async () => {
    if (!web3auth || !provider) return null;
    const web3 = new Web3(provider as any);
    const address = (await web3.eth.getAccounts())[0];
    const balance = web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
    console.log(balance);
    return balance;
  };

  const signMessage = async (message: string) => {
    if (!web3auth || !provider) return null;
    const web3 = new Web3(provider as any);
    const fromAddress = (await web3.eth.getAccounts())[0];
    const signedMessage = await web3.eth.personal.sign(message, fromAddress, "");
    return signedMessage;
  };

  const getAccounts = async () => {
    if (!web3auth || !provider) return null;
    const web3 = new Web3(provider as any);
    // Get user's Ethereum public address
    const address = await web3.eth.getAccounts();
    return address
  };

  const erc20ABI = [
    {
      "constant": true,
      "inputs": [{"name": "_owner", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"name": "balance", "type": "uint256"}],
      "type": "function"
    }
  ];

  const getWalletDetails = async () => {
    if (!web3auth || !provider) return null;
    try{

      const web3 = new Web3(provider as any);
      console.log("getting wallet details");
      const address = (await web3.eth.getAccounts())[0];
      const balance = web3.utils.fromWei(await web3.eth.getBalance(address), "ether");
      
      // const tokenBalance = await web3.eth.call({
        console.log(address, balance);
        return { address, balance };
      } catch (error) {
        console.error("Failed to get wallet details", error);
        return null;
      }

  }

  const withdrawFunds = async (amount: string, to: string ) => {
    if (!web3auth || !provider) return null;
    const web3 = new Web3(provider as any);
    const fromAddress = (await web3.eth.getAccounts())[0];
    const tx = {
      from: fromAddress,
      to: to,
      value: web3.utils.toWei(amount, "ether"),
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.NEXT_PUBLIC_PRIVATE_KEY as string);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction as string);
    console.log(receipt);
    return receipt;
  };


  return {
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
    provider,
    setWalletDetails,
    withdrawFunds,
    signClient,
  };
};

export default useWeb3Auth;

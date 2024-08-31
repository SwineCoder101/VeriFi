"use client"; // Add this directive at the top

import React, { useEffect, useState } from 'react';
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { ADAPTER_EVENTS, CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import Web3 from "web3";
import axios from 'axios';

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

interface AuthData {
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

const Web3AuthComponent: React.FC = () => {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [provider, setProvider] = useState<IProvider>();

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
      setWeb3auth(web3authInstance);
    };

    initializeWeb3Auth();
  }, []);

  const connectToLinkedin = async () => {
    try {
      if (web3auth) {
        await web3auth.init();
        await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
          loginProvider: "linkedin",
          extraLoginOptions: {
            domain: "https://dev-2uegducfnv75kjbo.us.auth0.com",
            verifierIdField: "sub", // Pass on the field name of the `sub` field in the JWT
            connection: "linkedin", // Use this to skip Auth0 Modal for LinkedIn login
          },
        });
  
        if (web3auth.status === ADAPTER_EVENTS.CONNECTED) {
          setIsConnected(true);
        }
      }
    } catch (error) {
      uiConsole("Failed to connect with openlogin provider", error);
    }
  };

  const getLinkedinProfile = async (user: AuthData) => {
    try {

      console.log('requestiong with token', user?.oAuthAccessToken); 

      const response = await axios.get("/api/proxy/linkedin/v2/me", {
        headers: {
          Authorization: `Bearer ${user?.oAuthAccessToken}`,
        },
      });

      console.log('response', response.data); 
      
    } catch (error) {
      uiConsole("Failed to get linkedin profile", error);
  };
}

  const connectToGoogle = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }

    try {
      await web3auth.init();
      const provider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "google",
        extraLoginOptions: {
          domain: "https://dev-2uegducfnv75kjbo.us.auth0.com",
          verifierIdField: "email", // Pass on the field name of the `sub` field in the JWT
          connection: "google", // Use this to skip Auth0 Modal for Google login
        },
      });
      
    } catch (error) {
      uiConsole("Failed to connect with openlogin provider", error);
  }
}

const connectToTwitter = async () => {
  if (!web3auth) {
    uiConsole("web3auth not initialized yet");
    return;
  }

  try {
    await web3auth.init();
    await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "twitter",
      extraLoginOptions: {
        domain: "https://dev-2uegducfnv75kjbo.us.auth0.com",
        verifierIdField: "sub", // Pass on the field name of the `sub` field in the JWT
        connection: "twitter", // Use this to skip Auth0 Modal for Google login
      },
    });
  } 
  catch (error) {
    uiConsole("Failed to connect with openlogin provider", error);
  }
}

const getUserInfo = async () => {
  // IMP START - Get User Information
  if (!web3auth) {
    uiConsole("web3auth not initialized yet");
    return;
  }
  const user = await web3auth.getUserInfo();

  const linkedinProfile = await getLinkedinProfile(user as AuthData);

  console.log(linkedinProfile);
  // IMP END - Get User Information
  uiConsole(user);
};

const getBalance = async () => {
  if (!web3auth) {
    uiConsole("provider not initialized yet");
    return;
  }
  const web3 = new Web3(web3auth.provider as any);

  // Get user's Ethereum public address
  const address = (await web3.eth.getAccounts())[0];

  // Get user's balance in ether
  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(address), // Balance is in wei
    "ether"
  );
  uiConsole(balance);
};

const signMessage = async () => {
  if (!web3auth) {
    uiConsole("provider not initialized yet");
    return;
  }
  const web3 = new Web3(web3auth.provider as any);

  // Get user's Ethereum public address
  const fromAddress = (await web3.eth.getAccounts())[0];

  const originalMessage = "YOUR_MESSAGE";

  // Sign the message
  const signedMessage = await web3.eth.personal.sign(
    originalMessage,
    fromAddress,
    "test password!" // configure your own password here.
  );
  uiConsole(signedMessage);
};

const getAccounts = async () => {
  if (!web3auth) {
    uiConsole("provider not initialized yet");
    return;
  }
  const web3 = new Web3(web3auth.provider as any);

  // Get user's Ethereum public address
  const address = await web3.eth.getAccounts();
  uiConsole(address);
};

const logout = async () => {
  if (!web3auth) {
    uiConsole("provider not initialized yet");
    return;
  }
  // IMP START - Logout
  await web3auth.logout();
  // IMP END - Logout
  setWeb3auth(null);
  setIsConnected(false);
  uiConsole("logged out");
};


const loggedInView = (
  <>
    <div className="flex-container">
      <div>
        <button onClick={getUserInfo} className="card">
          Get User Info
        </button>
      </div>
      <div>
        <button onClick={getAccounts} className="card">
          Get Accounts
        </button>
      </div>
      <div>
        <button onClick={getBalance} className="card">
          Get Balance
        </button>
      </div>
      <div>
        <button onClick={signMessage} className="card">
          Sign Message
        </button>
      </div>
      <div>
        <button onClick={logout} className="card">
          Log Out
        </button>
      </div>
    </div>
  </>
);


  const uiConsole = (...args: any[]): void => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  };

  return (
    <div>
      <p>
        {isConnected ? loggedInView: <button onClick={connectToLinkedin}>Connect LinkedIn</button> }
      </p>
      <button onClick={logout} className="card">
          Log Out
        </button>
      <div id="console">
      </div>
    </div>
  );
};

export default Web3AuthComponent;
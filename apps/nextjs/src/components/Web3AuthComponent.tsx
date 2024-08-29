"use client"; // Add this directive at the top

import React, { useEffect, useState } from 'react';
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";

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

const Web3AuthComponent: React.FC = () => {
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);

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
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }

    try {
      await web3auth.init();
      await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "linkedin",
        extraLoginOptions: {
          domain: "https://dev-2uegducfnv75kjbo.us.auth0.com",
          verifierIdField: "sub", // Pass on the field name of the `sub` field in the JWT
          connection: "linkedin", // Use this to skip Auth0 Modal for LinkedIn login
        },
      });
    } catch (error) {
      uiConsole("Failed to connect with openlogin provider", error);
    }
  };

  const uiConsole = (...args: any[]): void => {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
    console.log(...args);
  };

  return (
    <div>
      <button onClick={connectToLinkedin}>Connect LinkedIn</button>
      <div id="console">
        <p></p>
      </div>
    </div>
  );
};

export default Web3AuthComponent;
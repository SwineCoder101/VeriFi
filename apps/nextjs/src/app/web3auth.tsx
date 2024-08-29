import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES } from "@web3auth/base";

const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";
// get it from https://dashboard.web3auth.io by creating a Plug n Play project.

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1",
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/ethereum.svg",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

const web3auth = new Web3AuthNoModal({
  clientId,
  web3AuthNetwork: "sapphire_mainnet",
  privateKeyProvider: privateKeyProvider,
});

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    loginConfig: {
      // Google login
      google: {
        verifier: "verifi-social-login-verifier", // Pass the Verifier name here. eg. w3a-agg-example
        verifierSubIdentifier: "google-auth0", // Pass the Sub-Verifier here. eg w3a-google
        typeOfLogin: "jwt", // Pass the type of login provider.
        clientId: "owkYMjf1pI4NHNOxVB7m0uto88lHQDsA", // Pass the Google `Client ID` here.
      },
      linkedin: {
        verifier: "verifi-social-login-verifier", // Pass the Verifier name here. eg. w3a-agg-example
        verifierSubIdentifier: "linkedin-auth0", // Pass the Sub-Verifier here. eg w3a-a0-github
        typeOfLogin: "jwt", // Pass the type of login provider. For Auth0, it's jwt and not Auth0.
        clientId: "owkYMjf1pI4NHNOxVB7m0uto88lHQDsA", // Pass the Auth0 `Client ID` here.
      },
      // Email Password Login via Auth0
      github: {
        verifier: "verifi-social-login-verifier", // Pass the Verifier name here. eg. w3a-agg-example
        verifierSubIdentifier: "github-auth0", // Pass the Sub-Verifier here. eg w3a-a0-email-passwordless
        typeOfLogin: "jwt", // Pass the type of login provider. For Auth0, it's jwt and not Auth0.
        clientId: "owkYMjf1pI4NHNOxVB7m0uto88lHQDsA", // Pass the `Client ID` of your Auth0 Application.
      },
      twitter: {
        verifier: "verifi-social-login-verifier", // Pass the Verifier name here. eg. w3a-agg-example
        verifierSubIdentifier: "twitter-auth0", // Pass the Sub-Verifier here. eg w3a-a0-email-passwordless
        typeOfLogin: "jwt", // Pass the type of login provider. For Auth0, it's jwt and not Auth0.
        clientId: "owkYMjf1pI4NHNOxVB7m0uto88lHQDsA", // Pass the `Client ID` of your Auth0 Application.
      },
      emailpasswordless: {
        verifier: "verifi-social-login-verifier", // Pass the Verifier name here. eg. w3a-agg-example
        verifierSubIdentifier: "email-pw-auth0", // Pass the Sub-Verifier here. eg w3a-a0-email-passwordless
        typeOfLogin: "jwt", // Pass the type of login provider. For Auth0, it's jwt and not Auth0.
        clientId: "owkYMjf1pI4NHNOxVB7m0uto88lHQDsA", // Pass the `Client ID` of your Auth0 Application.
      },
    },
  },
  privateKeyProvider,
});

web3auth.configureAdapter(openloginAdapter);

// Initialize


// // When user clicks Google button, use this to Login with Google
// const web3authProvider = await web3auth.connectTo("openlogin", {
//   loginProvider: "google",
// });

// // When user clicks Email Passwordless button, use this to Login with Email Passwordless via Auth0
// const web3authProvider = await web3auth.connectTo("openlogin", {
//   loginProvider: "emailpasswordless",
//   extraLoginOptions: {
//     domain: "https://web3auth.au.auth0.com", // Pass the Auth0 Domain here, eg. https://web3auth.au.auth0.com
//     // This corresponds to the field inside jwt which must be used to uniquely identify the user.
//     verifierIdField: "email", // This is mapped b/w google and github logins.
//     isVerifierIdCaseSensitive: false,
//   },
// });

// // When user clicks GitHub button, use this to Login with GitHub via Auth0
// const web3authProvider = await web3auth.connectTo("openlogin", {
//   loginProvider: "github",
//   extraLoginOptions: {
//     domain: "https://web3auth.au.auth0.com", // Pass the Auth0 Domain here, eg. https://web3auth.au.auth0.com
//     // This corresponds to the field inside jwt which must be used to uniquely identify the user.
//     verifierIdField: "email", // This is mapped b/w google and github logins.
//     isVerifierIdCaseSensitive: false,
//   },
// });

function uiConsole(...args: any[]): void {
  const el = document.querySelector("#console>p");
  if (el) {
    el.innerHTML = JSON.stringify(args || {}, null, 2);
  }
  console.log(...args);
}

async function connectToLinkedin() {
  if (!web3auth) {
    uiConsole("web3auth initialised yet");
    return;
  }

  await web3auth.init();
  // Login with LinkedIn
  await web3auth.connectTo("openlogin", {
    loginProvider: "jwt",
    extraLoginOptions: {
      domain: "https://web3auth.au.auth0.com", // Pass on the Auth 
    },
    });
}

export { connectToLinkedin };
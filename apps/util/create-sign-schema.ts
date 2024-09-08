import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";
import dotenv from "dotenv";

dotenv.config();

async function createSchemaExample() {

  // Convert private key to account object
  const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}` || "0x");

  // Initialize SignProtocolClient
  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.baseSepolia,
    account: account, // Optional, depending on environment
  });

  try {
    const res = await client.createSchema({
      name: "SDK Test",
      data: [
        {
          name: "nullifier",
          type: "bytes",
        },
        {
          name: "type",
          type: "string",
        },
        {
          name: "signer",
          type: "address",
        },
        {
          name: "companyReviewId",
          type: "uint256",
        },
        {
          name: "companyId",
          type: "uint256",
        },
      ],
    });

    console.log("Schema created successfully:", res);
  } catch (error) {
    console.error("Error creating schema:", error);
  }
}

// Execute the function
createSchemaExample();

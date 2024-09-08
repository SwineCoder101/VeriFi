import { Attestation, AttestationDelegationSignature, AttestationResult, EvmChains, SignProtocolClient, SpMode } from "@ethsign/sp-sdk";
import { PrivateKeyAccount } from "viem";
import { privateKeyToAccount } from "viem/accounts";


// txHash: '0x4230d6d6c20f5244e190721930f77a35bdb40ec78518b29e09b475cc6860ab7b'
const SCHEMA_ID = '0x23c';

interface Schema {

}


const useSignAttestation = () => {

    async function createAttestation( client: SignProtocolClient,  attestation: Attestation,
        options?: {
          delegationSignature?: string;
          getTxHash?: (txHash: `0x${string}`) => void;
        },
      ): Promise<AttestationResult | null> {
        try {
          const res = await client.createAttestation(attestation, options);
          return res;
        } catch (error) {
          console.error("Error creating attestation:", error);
          return null;
        }
    }

    async function getAttestation(client: SignProtocolClient, attestationId: string): Promise<Attestation | null> {
        try {
          const res = await client.getAttestation(attestationId);
          return res;
        } catch (error) {
          console.error("Error getting attestation:", error);
          return null;
        }
    }

    return { createAttestation, getAttestation };
};




export { useSignAttestation , SCHEMA_ID };
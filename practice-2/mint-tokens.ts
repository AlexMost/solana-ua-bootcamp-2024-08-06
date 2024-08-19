import "dotenv/config";
import {Connection, Keypair, PublicKey, clusterApiUrl} from "@solana/web3.js";
import {mintTo} from "@solana/spl-token";
import {getExplorerLink} from "@solana-developers/helpers";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
    console.log("Add SECRET_KEY to .env!");
    process.exit(1);
}
const TOKEN_ADDRESS = "2HtDaPDAy8YJg28fUyZJys5jSuzANN5DBCMSoJnxpkvx";
const RECIPIENT = "Eymht59XH6DteEgVsvo3PAY7BxK4PtNaREDfLYmSJmdj";
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const tokenMintAccount = new PublicKey(
    TOKEN_ADDRESS
);

const recipientAssociatedTokenAccount = new PublicKey(
    RECIPIENT
);

const transactionSignature = await mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    sender,
    100 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`✅ Success! Mint Token Transaction: ${link}`);
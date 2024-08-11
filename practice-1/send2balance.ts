import 'dotenv/config';
import { airdropIfRequired } from '@solana-developers/helpers';
import {
    clusterApiUrl,
    Connection,
    LAMPORTS_PER_SOL,
    Keypair,
} from '@solana/web3.js';


const connection = new Connection(clusterApiUrl("devnet"));
let privateKey = process.env.SECRET_KEY;

if (!privateKey) {
    console.log('Adde SECRET_KEY to .env file');
    process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);

const publicKey = keypair.publicKey;

await airdropIfRequired(
    connection,
    publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL
)

console.log(`Airdrop sent to ${publicKey}`);

import { Keypair } from '@solana/web3.js';
import 'dotenv/config';

let privateKey = process.env.SECRET_KEY;

if (!privateKey) {
    console.log('Adde SECRET_KEY to .env file');
    process.exit(1);
}

const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);

console.log(`Public key: ${keypair.publicKey.toBase58()}`);

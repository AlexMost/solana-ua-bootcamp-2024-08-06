import 'dotenv/config';
import {
    clusterApiUrl,
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
} from '@solana/web3.js';

const connection = new Connection(clusterApiUrl("devnet"));
console.log('Connected to devnet');

const publicKeyStr = process.env.PUBLIC_KEY;
if (!publicKeyStr) {
    console.error('You should provide PUBLIC_KEY in .env');
    process.exit(1);
}

const publicKey = new PublicKey(publicKeyStr);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`The balance for waller at address ${publicKeyStr} is: ${balanceInSOL}` );

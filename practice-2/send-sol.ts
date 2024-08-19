import "dotenv/config";
import {
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    Connection,
    sendAndConfirmTransaction, TransactionInstruction
} from "@solana/web3.js";

const RECIPIENT = "DimaWWyAW2JBrHoESaYeFTmmzpUeuRUMcqwdox1iWxmp";
const AMOUNT = 0.01 * LAMPORTS_PER_SOL;

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

const recipient = new PublicKey(RECIPIENT);
console.log(`💸 Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: recipient,
  lamports: AMOUNT,
});

transaction.add(sendSolInstruction);
transaction.add(
    new TransactionInstruction({
      keys: [
        { pubkey: sender.publicKey, isSigner: true, isWritable: true },
      ],
      data: Buffer.from("Hello memo", "utf-8"),
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
    }),
  );

const signature = await sendAndConfirmTransaction(connection, transaction, [
  sender,
]);

console.log(`✅ Transaction confirmed, signature: ${signature}!`);


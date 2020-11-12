const ethers = require("ethers");
const fs = require("fs");

const wallet = ethers.Wallet.createRandom();


fs.writeFileSync("walletGenerated", wallet.mnemonic.phrase)

console.log(`Mnemonic : ${wallet.mnemonic.phrase}`);
console.log(`PrivateKey : ${wallet.privateKey}`);
console.log(`Address: ${wallet.address}`);

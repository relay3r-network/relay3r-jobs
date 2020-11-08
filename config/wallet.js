const ethers = require("ethers");

const mnemonic = "Put mnemonic here";
const wallet = ethers.Wallet.fromMnemonic(mnemonic);

// console.log(`Mnemonic: ${wallet.mnemonic.phrase}`);
console.log(`Address: ${wallet.address}`);

module.exports = wallet;

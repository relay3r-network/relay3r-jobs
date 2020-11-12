const ethers = require("ethers");
const { env } = require("../env");
const mnemonic = env.MNEMONIC;
const wallet = ethers.Wallet.fromMnemonic(mnemonic);

// console.log(`Mnemonic: ${wallet.mnemonic.phrase}`);
console.log(`Address: ${wallet.address}`);

module.exports = wallet;

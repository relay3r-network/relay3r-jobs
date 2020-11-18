//Import libraries
const ethers = require("ethers");

//Import config and abis
const wallet = require("../config/wallet.js.js");
const provider = require("../config/provider.js.js");
const { address, abi } = require("../abis/hegicjob.js.js");
const { getCurrentGasPrices } = require("../helper/gasGetter");

//Initialize account and abi
const account = wallet.connect(provider);
const HegicKeep3r = new ethers.Contract(address, abi, account);

//Global vars for job exec
let jobTXPending = false;
let workable = false;
let gas = 20;

async function UpdateGas() {
  let gasx = await getCurrentGasPrices();
  gas = gasx.high + 2;
}

async function main() {
  try {
    workable = await HegicKeep3r.workable();
    if (!jobTXPending && workable) {
      await UpdateGas();
      jobTXPending = true;
      const tx = await HegicKeep3r.claimRewards({
        gasPrice: gas * 1e9,
        gasLimit: 100000,
      });
      console.log(`Transaction hash: ${tx.hash}`);
      const receipt = await tx.wait();
      console.log(`Transaction confirmed in block ${receipt.blockNumber}`);
      console.log(`Gas used: ${receipt.gasUsed.toString()}`);
      jobTXPending = false;
    }
  } catch (error) {
    jobTXPending = false;
    console.log(error.reason);
  }
}

setInterval(async function () {
  if (!jobTXPending) {
    await main();
  }
}, 2000);

const ethers = require("ethers");
const web3 = require("web3");
const { env } = require("../env");
let currentProvider = null;
if (env.HTTP_PROVIDER){
    currentProvider = new web3.providers.HttpProvider(
        env.HTTP_PROVIDER
    );
} else {
    const infuraProjectID = env.INFURA_PROJECT_ID;
    currentProvider = new web3.providers.HttpProvider(
        `https://mainnet.infura.io/v3/${infuraProjectID}`
    );
}

let provider = new ethers.providers.Web3Provider(currentProvider);

module.exports = provider;

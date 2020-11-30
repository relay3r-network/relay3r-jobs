const {JobHandler} = require("./JobHandler");
const wallet = require("./config/wallet.js");
const provider = require("./config/provider.js");
const Web3 = require("web3")
const {env} = require("./env");

const web3 = new Web3(provider.connection.url);
const maxApiCall = env.API_CALL_LIMIT? env.API_CALL_LIMIT:100000;
const jobHandler = new JobHandler(wallet, provider, maxApiCall);

const waitProviderSync = () => {
    return new Promise((res) => {
        try {
            const intervalId = setInterval(async ()=> {
                const isSyncing = await web3.eth.isSyncing();
                if (!isSyncing) {
                    clearInterval(intervalId);
                    res();
                } else {
                    console.log("Waiting for eth node to be done syncing, block number:"+await provider.getBlockNumber()+", syncing status:",isSyncing);
                }
            }, 1000);
        } catch (error){
            console.log("Couldn't start: "+error)
        }
    })
}

waitProviderSync().then(()=>{
    for (let job of env.JOBS.split(",")){
        jobHandler.start(job);
    }
});


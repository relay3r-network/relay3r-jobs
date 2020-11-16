const {Job} = require("./Job");
const ethers = require("ethers");

const abi = require("../abis/unitraderelay3r.js");

class UnitradeRelay3r extends Job {
    constructor(account) {
        super("UnitradeRelay3r", new ethers.Contract(abi.address, abi.abi, account));
    }
}

exports.UnitradeRelay3r = UnitradeRelay3r;

const {Job} = require("../Job");
const ethers = require("ethers");

const contract = require("../../contracts/keeper/CrvStrategyKeep3r.js");

class CrvStrategyKeep3rJob extends Job {
    constructor(account, provider) {
        super("CrvStrategyKeep3r",
            new ethers.Contract(contract.address, contract.abi, account),
            provider
        );
        this.strategies = [
            "0x07DB4B9b3951094B9E278D336aDf46a036295DE7",//StrategyCurveYVoterProxy
            "0x112570655b32A8c747845E0215ad139661e66E7F",//StrategyCurveBUSDVoterProxy
            "0x6D6c1AD13A5000148Aa087E7CbFb53D402c81341",//StrategyCurveBTCVoterProxy
            "0xC59601F0CC49baa266891b7fc63d2D5FE097A79D",//StrategyCurve3CrvVoterProxy
        ]
        this.workableStrats = []
        this.workable = false;
    }
    isWorkable = async () =>{
        try {
            for(let i=0;i<this.strategies.length;i++) {
                let harvestable = await this.contract.workable(this.strategies[i])
                if(harvestable)
                    this.workableStrats.push(this.strategies[i]);
            }
            return this.workableStrats > 0;
        } catch (error) {
            this.log.error("Error evaluating if workable:"+ error);
        }
        return false;
    }

    async callWork(gas){
        try{
            for(let i=0;i<this.workableStrats.length;i++) {
                return await this.contract.harvest(this.workableStrats[i],{
                    gasPrice: gas * 1e9,
                })
            }
        }
        catch (error) {
            this.log.error("Error working : "+ error);
            return false;
        }
        return true;
    }
}

exports.CrvStrategyKeep3rJob = CrvStrategyKeep3rJob;

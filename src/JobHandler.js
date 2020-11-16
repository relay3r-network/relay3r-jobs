const {JobExecutor} = require("./jobs/JobExecutor");
const {UnitradeRelay3r} = require("./jobs/UnitradeRelay3rJob");
const {UniswapV2SlidingOracleJob} = require("./jobs/UniswapV2SlidingOracleJob");

const { Logger } = require("./helper/logger");

class JobHandler {

    constructor(wallet, provider) {
        this.account = wallet.connect(provider);
        this.availableJobs = [];
        this.registerAvailableJobs();
        this.runningJobs = [];
        this.log = Logger("JobHandler");
    }

    registerAvailableJobs(){
        this.availableJobs.push(new UniswapV2SlidingOracleJob(this.account));
        this.availableJobs.push(new UnitradeRelay3r(this.account));
    }

    start(jobName) {
        const job = this.availableJobs
            .find(job => job.name.toLowerCase() === jobName.toLowerCase());
        if (job){
            if (!this.isStarted(jobName)){
                const jobExecutor = new JobExecutor(job);
                jobExecutor.start();
                this.runningJobs.push(jobExecutor);
                this.log.info(`${job.name} is started`);
            } else {
                this.log.info(`${job.name} is already started`);
            }
        } else {
            this.log.warning(`${jobName} was not found`);
        }
    }

    isStarted(jobName){
        return !!this.getExecutor(jobName);
    }

    getExecutor(jobName){
        return this.runningJobs
            .find(executor => executor.job.name.toLowerCase() === jobName.toLowerCase());
    }

    stop(jobName){
        const executor = this.getExecutor(jobName);
        if (executor) {
            executor.stop();
            this.runningJobs = this.runningJobs.filter(jobExec => jobExec !== executor);
            this.log.info(`${executor.job.name} is stopped`);
        } else {
            this.log.info(`${jobName} is not started`);
        }
    }

}

exports.JobHandler = JobHandler;

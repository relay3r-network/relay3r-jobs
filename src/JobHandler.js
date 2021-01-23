const { JobExecutor } = require("./jobs/JobExecutor");
// Relayer jobs
/*
Inactive Relayer Jobs
const { CoreFlashArbRelayerJob } = require("./jobs/relayer/CoreFlashArbRelayerJob");
const { BACFarmerRelayerJob } = require("./jobs/relayer/BACFarmerRelayerJob");
const { SynlRebalancerJob } = require("./jobs/relayer/SynlRebalancerJob");
*/
const { UnitradeRelayerJob } = require("./jobs/relayer/UnitradeRelayerJob");
const { GetBackETHRelayerJob } = require("./jobs/relayer/GetBackETHRelayerJob");
const { RelayerV1OracleJob } = require("./jobs/relayer/RelayerV1OracleJob");

//Keeper jobs
const { HegicPoolKeeperJob } = require("./jobs/keeper/HegicPoolKeeperJob");
const { YearnV1EarnKeeperJob } = require("./jobs/keeper/YearnV1EarnKeeperJob");
const { Keep3rV1OracleJob } = require("./jobs/keeper/Keep3rV1OracleJob");
const {
  DForceStrategyKeep3rJob,
} = require("./jobs/keeper/DForceStrategyKeep3rJob");
const { CrvStrategyKeep3rJob } = require("./jobs/keeper/CrvStrategyKeep3rJob");
const {
  MMStrategyKeeperV1Job,
} = require("./jobs/keeper/MMStrategyKeeperV1Job");
const {
  YearnGenericKeep3rV2Job,
} = require("./jobs/keeper/YearnGenericKeep3rV2Job");
const { SushiswapV1OracleJob } = require("./jobs/keeper/SushiswapV1OracleJob");
const { LidoKeep3rJob } = require("./jobs/keeper/LidoKeep3rJob");
const {
  YearnLiquidationKeep3rJob,
} = require("./jobs/keeper/YearnLiquidationKeep3rJob");

const { Logger } = require("./helper/logger");

class JobHandler {
  constructor(wallet, provider, maxProviderCall) {
    this.account = wallet.connect(provider);
    this.provider = provider;
    this.maxProviderCall = maxProviderCall;
    this.availableJobs = [];
    this.registerAvailableJobs();
    this.runningJobs = [];
    this.log = Logger("JobHandler");
  }

  registerAvailableJobs() {
    this.availableJobs.push(
      //Relayer jobs
      /* Inactive Relayer jobs
      this.createJob(CoreFlashArbRelayerJob),
      this.createJob(BACFarmerRelayerJob),
      this.createJob(SynlRebalancerJob),
      */
      this.createJob(UnitradeRelayerJob),
      this.createJob(GetBackETHRelayerJob),
      this.createJob(RelayerV1OracleJob),
      //Keeper jobs
      this.createJob(HegicPoolKeeperJob),
      this.createJob(YearnV1EarnKeeperJob),
      this.createJob(Keep3rV1OracleJob),
      this.createJob(DForceStrategyKeep3rJob),
      this.createJob(CrvStrategyKeep3rJob),
      this.createJob(MMStrategyKeeperV1Job),
      this.createJob(YearnGenericKeep3rV2Job),
      this.createJob(SushiswapV1OracleJob),
      this.createJob(LidoKeep3rJob),
      this.createJob(YearnLiquidationKeep3rJob)
    );
  }

  createJob(jobClass) {
    return new jobClass(this.account, this.provider);
  }

  start(jobName) {
    const job = this.availableJobs.find(
      (job) => job.name.toLowerCase() === jobName.toLowerCase()
    );
    if (job) {
      if (!this.isStarted(jobName)) {
        try {
          const jobExecutor = new JobExecutor(job, this.provider);
          jobExecutor.start();
          this.runningJobs.push(jobExecutor);
          this.log.info(`${job.name} is started`);
          this.updateJobTimeout();
        } catch (error) {
          this.log.error(`Couldn't start ${job.name}: ${error}`);
        }
      } else {
        this.log.info(`${job.name} is already started`);
      }
    } else {
      this.log.warning(`${jobName} was not found`);
    }
  }

  updateJobTimeout() {
    const msInADay = 86400000;
    const callNeededToRunAllJobsOnce = 2 * this.runningJobs.length;
    const numberOfRuns = this.maxProviderCall / callNeededToRunAllJobsOnce;
    const newTimeout = msInADay / numberOfRuns;
    this.runningJobs.forEach((job) => (job.timeout = newTimeout));
  }

  isStarted(jobName) {
    return !!this.getExecutor(jobName);
  }

  getExecutor(jobName) {
    return this.runningJobs.find(
      (executor) => executor.job.name.toLowerCase() === jobName.toLowerCase()
    );
  }

  stop(jobName) {
    const executor = this.getExecutor(jobName);
    if (executor) {
      executor.stop();
      this.runningJobs = this.runningJobs.filter(
        (jobExec) => jobExec !== executor
      );
      this.log.info(`${executor.job.name} is stopped`);
      this.updateJobTimeout();
    } else {
      this.log.info(`${jobName} is not started`);
    }
  }
}

exports.JobHandler = JobHandler;

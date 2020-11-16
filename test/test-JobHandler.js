const {describe} = require('mocha');
const {expect} = require('chai');
const sinon = require("sinon");
const {Job} = require("../src/jobs/Job");

const {JobHandler} = require("../src/JobHandler");
const {JobExecutor} = require("../src/jobs/JobExecutor");

const fakeWallet = {
    connect: function (provider) {
        return "account"
    }
}

const provider = {}

const registerAvailableJobsStub = sinon.stub(JobHandler.prototype, "registerAvailableJobs").callsFake(() => {
});
const jobExecutorStartStub = sinon.stub(JobExecutor.prototype, "start").callsFake(() => {
});
const jobExecutorStopStub = sinon.stub(JobExecutor.prototype, "stop").callsFake(() => {
});

const jobName1 = "TestJob1";
const jobName2 = "testJob2";

const TestJobHandler = () => {
    registerAvailableJobsStub.resetHistory();
    jobExecutorStartStub.resetHistory();
    jobExecutorStopStub.resetHistory();
    const jobHandler = new JobHandler(fakeWallet, provider);
    jobHandler.availableJobs.push(new Job(jobName1, {}))
    jobHandler.availableJobs.push(new Job(jobName2, {}))
    return jobHandler;
}

describe('JobHandler class test', function () {
    it('Registers available jobs', () => {
        TestJobHandler();
        expect(registerAvailableJobsStub.calledOnce).to.be.true;
    })

    describe("Utility function", function () {
        it('getExecutor should return undefined if job is not started', () => {
            const jobHandler = TestJobHandler();
            expect(jobHandler.getExecutor("NotStartedJob")).to.be.undefined;
        });
        it('getExecutor should return executor if job is started', () => {
            const jobHandler = TestJobHandler();
            const jobName = "UnitradeRelay3r";
            const jobExecutor = new JobExecutor({name: jobName});
            jobHandler.runningJobs.push(jobExecutor);
            expect(jobHandler.getExecutor(jobName)).eq(jobExecutor);
        });

        it('isStarted should return false if job not started', () => {
            const jobHandler = TestJobHandler();
            expect(jobHandler.isStarted("NotStartedJob")).to.be.false;
        })

        it('isStarted should return true if job is started', () => {
            const jobHandler = TestJobHandler();
            const jobName = "UnitradeRelay3r";
            const jobExecutor = new JobExecutor({name: jobName});
            jobHandler.runningJobs.push(jobExecutor);
            expect(jobHandler.isStarted(jobName)).to.be.true;
        })

    });

    describe('Starting a job by name', function () {
        it('should warn if job is not found', () => {
            const jobHandler = TestJobHandler();
            const logSpy = sinon.spy(jobHandler.log, "warning");
            jobHandler.start("NotAJobName");
            expect(logSpy.calledOnce).to.be.true;
        });
        it('should warn if job is already running', () => {
            const jobHandler = TestJobHandler();
            const logSpy = sinon.spy(jobHandler.log, "info");
            const jobExecutor = new JobExecutor({name: jobName1});
            jobHandler.runningJobs.push(jobExecutor);
            jobHandler.start(jobName1)
            expect(logSpy.calledOnce).to.be.true;
        });
        it('should start a job', () => {
            const jobHandler = TestJobHandler();
            jobHandler.start(jobName1);
            expect(jobHandler.runningJobs[0].job.name).eq(jobName1);
        })
    });

    describe("Stopping a job by name", () => {
        it("Job should be stopped", () => {
            const jobHandler = TestJobHandler();
            const logSpy = sinon.spy(jobHandler.log, "info");
            const jobExecutor = new JobExecutor({name: jobName1});
            jobHandler.runningJobs.push(jobExecutor);
            jobHandler.stop(jobName1);
            expect(logSpy.calledOnce).to.be.true;
            expect(jobExecutorStopStub.calledOnce).to.be.true;
            expect(jobHandler.getExecutor(jobName1)).to.be.undefined;
        });
        it("Wrong name", () => {
            const jobHandler = TestJobHandler();
            const logSpy = sinon.spy(jobHandler.log, "info");
            const jobExecutor = new JobExecutor({name: jobName1});
            jobHandler.runningJobs.push(jobExecutor);
            jobHandler.stop(jobName2);
            expect(logSpy.calledOnce).to.be.true;
            expect(jobExecutorStopStub.called).to.be.false;
            expect(jobHandler.getExecutor(jobName1)).to.be.any;
        })
    })
});

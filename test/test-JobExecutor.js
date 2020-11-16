const { describe } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const {Job} = require("../src/jobs/Job");
const {JobExecutor} = require("../src/jobs/JobExecutor");

describe("JobExecutor tests", () => {
    it("Should start", () => {
        const jobExecutor = new JobExecutor({});
        const runStub = sinon.stub(jobExecutor, "run");
        jobExecutor.start();
        expect(jobExecutor.running).to.be.true;
        expect(runStub.calledOnce).to.be.true;
    });

    it( "Should exec and setTimout for next run", () => {
        const clock = sinon.useFakeTimers();
        const job = new Job("test", {});
        const execStub = sinon.stub(job, "exec");
        const jobExecutor = new JobExecutor(job);
        const getTimeoutStub = sinon.stub(jobExecutor, "getTimeout").returns(15000);
        jobExecutor.run();
        expect(execStub.calledOnce).to.be.true;
        clock.tick(15010);
        expect(execStub.calledTwice).to.be.true;
        clearTimeout(jobExecutor.id);
        clock.restore();
    });

    it("Should stop", () => {
        const clock = sinon.useFakeTimers();
        const job = new Job("test", {});
        const execStub = sinon.stub(job, "exec");
        const jobExecutor = new JobExecutor(job);
        const getTimeoutStub = sinon.stub(jobExecutor, "getTimeout").returns(15000);
        jobExecutor.run();
        expect(execStub.calledOnce).to.be.true;
        clock.tick(14000);
        jobExecutor.stop();
        clock.tick(2000);
        expect(jobExecutor.running).to.be.false;
        expect(execStub.callCount).eq(1);
        clock.restore();
    });
});

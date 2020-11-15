const { describe } = require('mocha');
const { expect, assert } = require('chai');
const { Logger } = require("../src/helper/logger");

const loggerPrefix = "Test";
const log = Logger(loggerPrefix)

describe('Logger formatting', function () {
    it('Format info', function () {
        const message = "message";
        expect(log.format(message, "info")).eq(`[${log.prefix}][${log.levels.info}] ${message}`);
    });
    it('Format warning', function () {
        const message = "message";
        expect(log.format(message, "warning")).eq(`[${log.prefix}][${log.levels.warning}] ${message}`);
    });
    it('Format error', function () {
        const message = "message";
        expect(log.format(message, "error")).eq(`[${log.prefix}][${log.levels.error}] ${message}`);
    });
    it("Outputs formatted log", function () {
        log.info("logged")
    });
});
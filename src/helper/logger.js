const chalk = require("chalk");

const Logger = (prefix) => {
  return {
    prefix,
    info: function (msg) {
      this.print(msg, "info");
    },
    warning: function (msg) {
      this.print(msg, "warning");
    },
    error: function (msg) {
      this.print(msg, "error");
    },
    print: function (msg, level) {
      console.log(this.format(msg, level));
    },
    format: function (msg, level) {
      switch (this.levels[level]) {
        case this.levels.info:
          return `[${this.prefix}]${chalk.blue(
            `[${this.levels[level]}]`
          )} ${msg}`;
        case this.levels.warning:
          return `[${this.prefix}]${chalk.yellow(
            `[${this.levels[level]}]`
          )} ${msg}`;
        case this.levels.error:
          return `[${this.prefix}]${chalk.red(
            `[${this.levels[level]}]`
          )} ${msg}`;
      }
      // return `[${this.prefix}][${this.levels[level]}] ${msg}`;
    },
    levels: {
      info: "INFO",
      warning: "WARNING",
      error: "ERROR",
    },
  };
};

exports.Logger = Logger;

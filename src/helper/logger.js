const Logger = (prefix) => {
    return {
        prefix,
        info: function (msg) { this.print(msg, "info") },
        warning: function (msg) { this.print(msg, "warning") },
        error: function (msg) { this.print(msg, "error") },
        print: function (msg, level) {
            console.log(this.format(msg, level));
        },
        format: function (msg, level) {
            return `[${this.prefix}][${this.levels[level]}] ${msg}`;
        },
        levels: {
            info: "INFO",
            warning: "WARNING",
            error: "ERROR"
        }
    }
}

exports.Logger = Logger;
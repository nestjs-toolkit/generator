"use strict";

const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("name", {
      type: String,
      required: true,
      description: "domain name single"
    });

    this.option("path", {
      alias: "p",
      type: String,
      required: false,
      default: ".",
      description: "path dist"
    });
  }

  initializing() {
    this.composeWith(require.resolve("../base"), {
      path: this.options.path,
      arguments: [this.options.name]
    });

    this.composeWith(require.resolve("../cqrs"), {
      path: this.options.path,
      arguments: [this.options.name]
    });
  }
};

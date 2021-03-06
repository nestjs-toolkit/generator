"use strict";

const Generator = require("yeoman-generator");
const path = require("path");
const chalk = require("chalk");
const yosay = require("yosay");
const boxen = require("boxen");

const { makeFileTemplate } = require("../../utils/get-files");
const { buildVariables } = require("../../utils/build");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("name", {
      type: String,
      required: true,
      description: "domain name single"
    });

    this.option("dryRun", {
      alias: "d",
      type: Boolean,
      required: false,
      default: false,
      description: "sandbox"
    });

    this.option("path", {
      alias: "p",
      type: String,
      required: false,
      default: ".",
      description: "path dist"
    });
  }

  Prompting() {
    this.log(
      yosay(`Welcome to the stellar ${chalk.red("nestjs-gen")} CQRS generator!`)
    );

    this.variables = buildVariables({
      name: this.options.name,
      basePath: this.options.path
    });
  }

  async writing() {
    const dir = path.join(__dirname, "templates/");

    if (this.options.dryRun) {
      this.log(`IN ${chalk.red("dry-run")} CQRS!`);
    }

    for await (const f of makeFileTemplate(dir, this.variables.name)) {
      if (this.options.dryRun) {
        this.log(`create: ${this.variables.path}/${f.dist}`);
      } else {
        this.fs.copyTpl(
          this.templatePath(f.src),
          this.destinationPath(`${this.variables.path}/${f.dist}`),
          this.variables
        );
      }
    }
  }

  Install() {
    if (this.options.dryRun) {
      return;
    }

    this.log(
      yosay(
        `Update your module ${chalk.red(`${this.variables.name}.module.ts`)}`
      )
    );

    this.log(
      boxen(
        `
      @Module({
        imports: [
          ...
          CqrsModule,
        ],
        providers: [
          ...
          ${this.variables.namePluralPascal}Saga,
          ${this.variables.namePascal}PublishHandler,
        ],
      })
    `,
        { padding: 1, margin: 2 }
      )
    );
  }
};

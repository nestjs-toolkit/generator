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
      path:
        this.options.path === "." ? `./${this.options.name}` : this.options.path
    });
  }

  async writing() {
    const dir = path.join(__dirname, "templates/");

    for await (const f of makeFileTemplate(dir, this.variables.name)) {
      this.fs.copyTpl(
        this.templatePath(f.src),
        this.destinationPath(`${this.variables.path}/${f.dist}`),
        this.variables
      );
    }
  }

  Install() {
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

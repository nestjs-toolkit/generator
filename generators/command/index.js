"use strict";

const Generator = require("yeoman-generator");
const path = require("path");
const chalk = require("chalk");
const yosay = require("yosay");
const boxen = require("boxen");

const { makeFileTemplate } = require("../../utils/get-files");
const { buildVariables } = require("../../utils/build");
const { render } = require("../../utils/render");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("name", {
      type: String,
      required: true,
      description: "name command"
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
      yosay(
        `Welcome to the stellar ${chalk.red(
          "nestjs-gen"
        )} CQRS - command generator!`
      )
    );

    this.variables = buildVariables({
      name: this.options.name,
      path: this.options.path,
      basePath: this.options.path
    });
  }

  async writing() {
    const dir = path.join(__dirname, "templates/");

    if (this.options.dryRun) {
      this.log(`IN ${chalk.red("dry-run")} CQRS - command!`);
    }

    for await (const f of makeFileTemplate(dir, this.variables.name)) {
      const dist = this.destinationPath(`${this.variables.path}/${f.dist}`);

      if (this.options.dryRun) {
        const label = this.fs.exists(dist) ? "modify" : "create";
        this.log(`${label}: ${this.variables.path}/${f.dist}`);
        continue;
      }

      if (dist.endsWith("index.ts") && this.fs.exists(dist)) {
        const content = render(
          this.fs.read(this.templatePath(f.src)),
          "demo.txt",
          this.variables
        );
        this.fs.append(dist, content, { force: true });
        continue;
      }

      this.fs.copyTpl(this.templatePath(f.src), dist, this.variables);
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
          ${this.variables.namePascal}Handler,
        ],
      })
    `,
        { padding: 1, margin: 2 }
      )
    );
  }
};

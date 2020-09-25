"use strict";

const Generator = require("yeoman-generator");
const path = require("path");
const chalk = require("chalk");
const yosay = require("yosay");
const boxen = require("boxen");
const pluralize = require("pluralize");
const camelCase = require("camelcase");

const { makeFileTemplate } = require("../../utils/get-files");

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
      yosay(`Welcome to the stellar ${chalk.red("nestjs-gen")} generator!`)
    );

    // Const prompts = [
    //   {
    //     type: "confirm",
    //     name: "someAnswer",
    //     message: "Would you like to enable this option?",
    //     default: true
    //   }
    // ];
    //
    // return this.prompt(prompts).then(props => {
    //   this.props = props;
    // });

    const name = this.options.name;
    const path = this.options.path === "." ? `./${name}` : this.options.path;

    this.variables = {
      path,
      name: name,
      nameUp: name.toUpperCase(),
      namePlural: pluralize(name),
      nameCamel: camelCase(name),
      namePascal: camelCase(name, { pascalCase: true })
    };
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
          CategoriesSaga,
          CategoryPublishHandler,
        ],
      })
    `,
        { padding: 1, margin: 2 }
      )
    );
  }
};

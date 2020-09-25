"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the peachy ${chalk.red("generator-nestjs-gen")} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "someAnswer",
        message: "Would you like to enable this option?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.log("props", this.props);

    this.fs.copyTpl(
      this.templatePath("dummyfile.txt"),
      this.destinationPath("dummyfile.txt"),
      { name: "dumy2" }
    );
  }

  install() {
    // This.installDependencies();
  }
};

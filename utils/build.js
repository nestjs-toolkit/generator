"use strict";

const pluralize = require("pluralize");
const camelCase = require("camelcase");

module.exports = {
  buildVariables: vars => {
    const { name } = vars;

    return Object.assign(
      {
        nameUp: name.toUpperCase(),
        namePlural: pluralize(name),
        nameCamel: camelCase(name),
        namePascal: camelCase(name, { pascalCase: true }),
        namePluralPascal: camelCase(pluralize(name), { pascalCase: true })
      },
      vars
    );
  }
};

"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("nestjs-gen:base", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/base"))
      .withArguments("demo");
  });

  it("creates files", () => {
    assert.file([
      "./demo/demos.module.ts",
      "./demo/demos.constants.ts",
      "./demo/demos.graphql",
      "./demo/demos.module.ts",
      "./demo/demos.repository.ts",
      "./demo/demos.resolver.ts",
      "./demo/dto/demo.dto.ts",
      "./demo/dto/index.ts",
      "./demo/index.ts",
      "./demo/schemas/demo.schema.ts",
      "./demo/schemas/index.ts"
    ]);
  });
});

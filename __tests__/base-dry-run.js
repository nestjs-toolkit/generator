"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("nestjs-gen:base", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/base"))
      .withOptions({ path: "foo", "dry-run": true })
      .withArguments("demo");
  });

  it("dry-run", () => {
    assert.noFile([
      "./foo/demos/demos.module.ts",
      "./foo/demos/demos.constants.ts",
      "./foo/demos/demos.graphql",
      "./foo/demos/demos.module.ts",
      "./foo/demos/demos.repository.ts",
      "./foo/demos/demos.resolver.ts",
      "./foo/demos/dto/demo.dto.ts",
      "./foo/demos/dto/index.ts",
      "./foo/demos/index.ts",
      "./foo/demos/schemas/demo.schema.ts",
      "./foo/demos/schemas/index.ts"
    ]);
  });
});

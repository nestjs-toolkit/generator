"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-nestjs-gen:e2e", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/e2e"))
      .withOptions({ path: "foo" })
      .withArguments("demo");
  });

  it("creates files", () => {
    assert.file(["./foo/demos/demos.e2e-spec.ts"]);
  });
});

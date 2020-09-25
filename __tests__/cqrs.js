"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-nestjs-gen:cqrs", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/cqrs"))
      .withPrompts({ someAnswer: true });
  });

  it("creates files", () => {
    assert.file(["dummyfile.txt"]);
  });
});

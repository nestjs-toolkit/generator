"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-nestjs-gen:cqrs", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/cqrs"))
      .withOptions({ path: "foo" })
      .withArguments("demo");
  });

  it("creates files", () => {
    assert.file([
      "./foo/demos/demos.saga.ts",
      "./foo/demos/commands/demo-publish.command.ts",
      "./foo/demos/commands/index.ts",
      "./foo/demos/events/demo-created.event.ts",
      "./foo/demos/events/demo-deleted.event.ts",
      "./foo/demos/events/demo-updated.event.ts",
      "./foo/demos/events/index.ts",
      "./foo/demos/handlers/demo-publish.handler.ts",
      "./foo/demos/handlers/index.ts"
    ]);
  });
});

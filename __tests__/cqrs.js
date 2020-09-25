"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-nestjs-gen:cqrs", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/cqrs"))
      .withArguments("demo");
  });

  it("creates files", () => {
    assert.file([
      "./demo/demos.saga.ts",
      "./demo/commands/demo-publish.command.ts",
      "./demo/commands/index.ts",
      "./demo/events/demo-created.event.ts",
      "./demo/events/demo-deleted.event.ts",
      "./demo/events/demo-updated.event.ts",
      "./demo/events/index.ts",
      "./demo/handlers/demo-publish.handler.ts",
      "./demo/handlers/index.ts"
    ]);
  });
});

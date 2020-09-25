"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-nestjs-gen:resource", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/resource"))
      .withOptions({ path: "foo", "dry-run": true })
      .withArguments("demo");
  });

  it("dry-run", () => {
    assert.noFile([
      // BASE
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
      "./foo/demos/schemas/index.ts",

      // CQRS
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

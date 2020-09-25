"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-nestjs-gen:resource", () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, "../generators/resource"))
      .withArguments("demo");
  });

  it("creates files", () => {
    assert.file([
      // BASE
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
      "./demo/schemas/index.ts",

      // CQRS
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

"use strict";
const ejs = require("ejs");
const isBinaryFileSync = require("isbinaryfile").isBinaryFileSync;

function render(contents, filename, context, tplSettings) {
  let result;

  const contentsBuffer = Buffer.from(contents, "binary");
  if (isBinaryFileSync(contentsBuffer, contentsBuffer.length)) {
    result = contentsBuffer;
  } else {
    result = ejs.render(
      contents.toString(),
      context,
      // Setting filename by default allow including partials.
      { filename: filename, ...tplSettings }
    );
  }

  return result;
}

module.exports = { render };

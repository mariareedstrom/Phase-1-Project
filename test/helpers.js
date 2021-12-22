const chai = require("chai");
const fs = require("fs");
const jsdom = require("mocha-jsdom");
const path = require("path");
const babel = require("@babel/core");

global.expect = chai.expect;
require("isomorphic-fetch");

chai.use(require("chai-dom"));
chai.use(require("chai-fetch-mock"));

const url = "http://localhost";
const html = fs.readFileSync(
  path.resolve(__dirname, "..", "index.html"),
  "utf-8"
);

const babelResult = babel.transformFileSync(
  path.resolve(__dirname, "..", "index.js"),
  {
    presets: ["@babel/env"],
  }
);

const src = babelResult.code;

jsdom({
  html,
  src,
  url,
});

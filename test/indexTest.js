const { expect } = require("chai");
const CombinedStream = require("combined-stream");
const { fail } = require("yargs");

describe("Cat", () => {
  it("has DNA", () => {
    const cat = new Cat("SAEGRHYOMCCREPUGDNDDIICTSJZQRYVQ");
    expect(cat).to.have.property("dna");
  });

  describe("generateRandom()", () => {
    it("function exists", () => {
      expect(Cat.generateRandom).to.be.a("function");
    });
    it("produces random cat", () => {
      expect(Cat.generateRandom()).to.be.instanceof(Cat);
    });
  });

  it("validates DNA", () => {
    const errMsg = "DNA must match [A-Z]{32}";
    const badFn = () => new Cat("aaaaaa");
    expect(badFn).to.throw(errMsg);
    const goodFn = () => Cat.generateRandom();
    expect(goodFn).not.to.throw(errMsg);
  });

  describe("mate()", () => {
    it("function exists", () => {
      const cat = Cat.generateRandom();
      expect(cat.mate).to.be.a("function");
    });

    it("produces new cat", () => {
      const catA = Cat.generateRandom();
      const catB = Cat.generateRandom();
      const kitten = catA.mate(catB);
      expect(kitten).to.be.an.instanceof(Cat);
    });

    it("produces genetics from both parents", () => {
      // get dna of cat a and cat b
      const catA = Cat.generateRandom();
      const catB = Cat.generateRandom();
      // halvsies on both dna
      const kitten = catA.mate(catB);

      // deinterlace kitten dna
      let testADna = "";
      let testBDna = "";

      for (let i = 0; i <= kitten.dna.length; i++) {
        if (i % 2 === 0) {
          testADna += kitten.dna.charAt(i);
        } else {
          testBDna += kitten.dna.charAt(i);
        }
      }
      // expect a and b dna halves match parents
      expect(testADna).to.equal(catA.dna.slice(0, 16));
      expect(testBDna).to.equal(catB.dna.slice(0, 16));
    });
  });
});

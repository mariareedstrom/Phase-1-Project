const { expect } = require("chai");
const fetchMock = require("fetch-mock");

before(() => {
  // ensure window fetch is set to global fetch
  window.fetch = fetch;
  // don't run init so we can test it
  window.preventInitialize = true;
});

beforeEach(() => {
  // fake all calls to robohash
  fetchMock.mock("begin:https://robohash.org/", 200);
});

afterEach(() => {
  // remove fake to robohash
  fetchMock.restore();
});

describe("Cat", () => {
  it("has DNA", () => {
    const cat = new Cat("SAEGRHYOMCCREPUGDNDDIICTSJZQRYVQ");
    expect(cat).to.have.property("dna");
  });

  describe("generateRandom", () => {
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

  describe("mate", () => {
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

describe("fetchCat", () => {
  it("function exists", () => {
    expect(fetchCat).to.be.a("function");
  });
});

describe("renderCatCard", () => {
  it("function exists", () => {
    expect(renderCatCard).to.be.a("function");
  });
  it("returns a cat card without optional data", () => {
    const cat = Cat.generateRandom();
    const catCard = renderCatCard(cat);
    expect(catCard).to.be.an("HTMLElement");
    const setFreeNode = catCard.querySelector(".set-free");
    expect(setFreeNode).not.to.exist;
  });

  it("returns a cat card with optional set free", () => {
    const catA = Cat.generateRandom();
    const catB = Cat.generateRandom();
    const cat = catA.mate(catB);

    const catCard = renderCatCard(cat);
    expect(catCard).to.be.an("HTMLElement");
    const setFreeNode = catCard.querySelector(".set-free");
    expect(setFreeNode).to.exist;
  });
});

describe("initialize", () => {
  it("function exisits", () => {
    expect(initialize).to.be.a("function");
  });
  it("renders 4 cat cards to the grid", () => {
    initialize();
    const catCardNodes = document.querySelectorAll(".cat-card");
    expect(catCardNodes).to.have.length(4);
  });
});

describe("selectCatByDNA", () => {
  it("function exists", () => {
    expect(selectCatByDNA).to.be.a("function");
  });
  it("sets selected state on cat card", () => {
    // render fake cat to screen
    const fakeCatCard = document.createElement("div");
    fakeCatCard.dataset.dna = "foo";
    document.body.appendChild(fakeCatCard);

    // invoke selectCatByDNA
    selectCatByDNA("foo");

    // expect seleceted card has selected class
    expect(fakeCatCard).to.match(".selected");
    // expect selected card has selected = true in dataset
    expect(fakeCatCard.dataset.selected).to.equal("true");
  });
});

describe("deselcetCatByDNA", () => {
  it("function exisits", () => {
    expect(deselectCatByDNA).to.be.a("function");
  });
  it("removes selected state on a cat card", () => {
    // render fake cat to screen
    const fakeCatCard = document.createElement("div");
    fakeCatCard.dataset.dna = "foo";
    document.body.appendChild(fakeCatCard);

    // invoke deselectCatByDNA
    deselectCatByDNA("foo");

    // expect cat card not to have selected class
    expect(fakeCatCard).to.not.match("selected");
    // expect cat card to have selected = false in dataset
    expect(fakeCatCard.dataset.selected).to.not.exist;
  });
});

describe("mateCatsByDNA", () => {
  it("function exists", () => {
    expect(mateCatsByDNA).to.be.a("function");
  });
  it("creates a new instance of Cat", () => {
    const catADNA = "SAEGRHYOMCCREPUGDNDDIICTSJZQRYVQ";
    const catBDNA = "THWOMALWUJSLATWQMBCFTPOYHVDRESWL";

    // mate selected cats
    mateCatsByDNA(catADNA, catBDNA);

    //
    const expectedDNA = "STAHEWGORMHAYLOWMUCJCSRLEAPTUWGQ";
    const catCard = document.querySelector(`[data-dna=${expectedDNA}]`);
    expect(catCard).to.exist;
  });
});

describe("appendCatCardToGrid", () => {
  it("function exists", () => {
    expect(appendCatCardToGrid).to.be.a("function");
  });
  it("sets cat card to column on grid", () => {
    // render fake cat card
    const fakeCatCard = document.createElement("div");
    fakeCatCard.id = "fakeCatCard";
    const grid = document.querySelector("#catGridNew");

    // append fake cat card to column on grid
    appendCatCardToGrid(grid, fakeCatCard);

    expect(grid).to.have.descendant("#fakeCatCard");
  });
});

describe("clickCatHandler", () => {
  it("function exists", () => {
    expect(clickCatHandler).to.be.a("function");
  });
  it("if cat is already selecte, deselects it", () => {
    // const selectedCat =
  });
  it("mates if different cat currently selected", () => {
    //
  });
  it("selects cat if no other cat selcted", () => {
    //
  });
});

// clickCatFavoriteHandler

// setFreeHandler

/**
 * Cat exists as a sequence of DNA.
 *
 * To create new cats, two sequences of DNA are combined by interlacing.
 */
class Cat {
  /**
   * Generates cats randomly.
   *
   * @returns {Cat} a randomly generated cat
   */
  static generateRandom() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charLength = characters.length;
    const length = 32;
    let dna = "";

    for (let i = 0; i < length; i++) {
      dna += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return new Cat(dna);
    // return new instance of cat
  }

  /**
   * Creates new cat from provided DNA sequence.
   *
   * @param {string} dna a string of 32 characters with range `[A-Z]`.
   */
  constructor(dna) {
    // validate DNA
    const regex = new RegExp("[A-Z]{32}");
    if (!regex.test(dna)) {
      throw "DNA must match [A-Z]{32}";
    }
    // set DNA
    this._dna = dna;
  }

  /**
   * DNA sequence of cat
   */
  get dna() {
    return this._dna;
  }

  /**
   * Produces new cat from DNA of this cat and given cat.
   *
   * @param {Cat} cat will share DNA with this cat.
   * @returns {Cat} new cat from combined DNA.
   */
  mate(cat) {
    const a = this.dna.slice(0, 16).split("");
    const b = cat.dna.slice(0, 16).split("");

    let newDna = "";

    for (let i = 0; i < a.length && i < b.length; i++) {
      newDna += a[i] + b[i];
    }
    return new Cat(newDna);
  }
}

// API code:

// Fetch request, get fetch for first four cats
/**
 * Fetch cat from API using DNA.
 *
 * @param {Cat} cat the cat that will be fetched
 *
 * @returns {Promise<string>} cat img src
 */
function fetchCat(cat) {
  // build URL from cat DNA
  const catUrl = `https://robohash.org/${cat.dna}?set=set4`;
  // fetch cat image from API
  return (
    fetch(catUrl)
      .then((resp) => {
        return resp.blob();
      })
      // convert binary into img src using "blob"
      .then((catBlob) => {
        return URL.createObjectURL(catBlob);
      })
  );
}

//Cat Cards
/**
 * Create a cat card
 *
 * @param {Cat} cat the cat that will be rendered
 * @param {boolean} canBeFreed true value allows cat to be removed
 * @param {[catADNA: string, catBDNA: string]} parents dna of two cat parents
 *
 * @returns {HTMLElement} a cat card DOM element
 */
function renderCatCard(cat, canBeFreed = false, parents = []) {
  const catCard = document.createElement("section");
  catCard.classList.add("card", "hoverable", "growable", "cat-card");
  catCard.dataset.dna = cat.dna;

  const cardImg = document.createElement("div");
  cardImg.classList.add("card-image");

  const catImg = document.createElement("img");
  cardImg.append(catImg);

  const cardComment = document.createElement("div");
  cardComment.classList.add("card-content");

  const cardAction = document.createElement("footer");
  cardAction.classList.add("card-action");

  const favorite = document.createElement("span");
  favorite.classList.add("favorite");
  favorite.textContent = "♡";
  favorite.style.cursor = "pointer";

  cardAction.append(favorite);

  const parentThumb = document.createElement("div");
  parentThumb.classList.add("parent-thumb");

  if (canBeFreed) {
    const setFree = document.createElement("button");
    setFree.classList.add("set-free");
    setFree.textContent = "Set Free!";

    cardAction.append(setFree);
    setFree.addEventListener("click", setFreeHandler);
  }

  if (parents.length === 2) {
    parents.forEach((dna) => {
      const parentCat = new Cat(dna);

      const parentImg = document.createElement("img");
      parentImg.classList.add("parent-img");

      parentThumb.append(parentImg);
      cardComment.textContent = "Lineage: ";

      fetchCat(parentCat).then((catUrl) => {
        // apply to img tag
        parentImg.src = catUrl;
      });

      cardComment.append(parentThumb);
    });
  }

  catCard.append(cardImg, cardComment, cardAction);

  // fetch img
  fetchCat(cat).then((catUrl) => {
    // apply to img tag
    const img = catCard.querySelector(".card-image img");
    img.src = catUrl;
  });

  // add event listeners
  favorite.addEventListener("click", clickCatFavoriteHandler);
  catCard.addEventListener("click", clickCatHandler);

  return catCard;
}

/**
 * Sets selected state on cat card.
 *
 * @param {string} dna the cat dna to use for lookup
 *
 */
function selectCatByDNA(dna) {
  // use document.querySelector("[data-dna=]") to find cat by DNA
  const selectedCatCard = document.querySelector(`[data-dna=${dna}]`);

  // check if property is present, if not add selected to dataset and class
  if ("selected" in selectedCatCard.dataset === false) {
    selectedCatCard.dataset.selected = "true";
    selectedCatCard.classList.add("selected");
  }
}

/**
 *
 * @param {string} dna of the cat to deselect
 *
 */
function deselectCatByDNA(dna) {
  // use document.querySelector("[data-dna=]") to find cat by DNA
  const selectedCatCard = document.querySelector(`[data-dna=${dna}]`);

  // check if property is present, if it is remove selected dataset and class
  if ("selected" in selectedCatCard.dataset === true) {
    delete selectedCatCard.dataset.selected;
    selectedCatCard.classList.remove("selected");
  }
}

//Function to mate two selected cats by DNA
/**
 *
 * @param {string} catADNA from selected cat
 * @param {string} catBDNA from previously selected cat (mate)
 */
function mateCatsByDNA(catADNA, catBDNA) {
  // instantiate selected cat
  const selectedCat = new Cat(catADNA);
  // instantiate mate
  const mateCat = new Cat(catBDNA);
  const newCat = selectedCat.mate(mateCat);

  // render and append cat card to cat grid
  const catCard = renderCatCard(newCat, true, [catADNA, catBDNA]);
  const grid = document.querySelector("#catGridNew");
  appendCatCardToGrid(grid, catCard);
}

/**
 *
 * @param {Element} grid to which card will be appended
 * @param {Element} catCard card to append to grid
 */
function appendCatCardToGrid(grid, catCard) {
  // set columns
  const column = document.createElement("div");
  column.classList.add("col", "s6", "m3");
  // append card to column, and column to grid
  column.append(catCard);
  grid.append(column);
}

// Event  handlers:

// Handle click cat
/**
 *
 * @param {Event} e
 */
function clickCatHandler(e) {
  const selectedCatCard = e.target.closest("[data-dna]");
  const dna = selectedCatCard.dataset.dna;
  const isSlected = "selected" in selectedCatCard.dataset === true;
  const firstMateCard = document.querySelector(".cat-card[data-selected=true]");
  const hasMate = firstMateCard !== null;

  // if cat already selected, deselect
  if (isSlected) {
    deselectCatByDNA(dna);
  }
  // mate if different cat currently selected, then set to deselect
  else if (hasMate) {
    const mateDNA = firstMateCard.dataset.dna;
    mateCatsByDNA(dna, mateDNA);
    deselectCatByDNA(mateDNA);
  }
  // select since nothing selected
  else {
    selectCatByDNA(dna);
  }
}

// Handle Heart button
/**
 *
 * @param {Event} e
 */
function clickCatFavoriteHandler(e) {
  // prevent event from bubbling
  e.stopPropagation();

  const selectedCatFavorite = e.target;
  const like = selectedCatFavorite.textContent;

  if (like === "♡") {
    selectedCatFavorite.textContent = "❤️";
  } else {
    selectedCatFavorite.textContent = "♡";
  }
}

// Handle Set Free! button
/**
 *
 * @param {Event} e
 */
function setFreeHandler(e) {
  // prevent event from bubbling
  e.stopPropagation();

  const catToSetFree = e.target;
  catToSetFree.parentNode.parentNode.remove();
}

//Initialize: get data and render cats to the DOM
function initialize() {
  const maxOrigCats = 4;
  for (let i = 0; i < maxOrigCats; i++) {
    // generate random Cat
    const cat = Cat.generateRandom();
    // render cat card
    const catCard = renderCatCard(cat, false);

    // append card to the origial grid

    const grid = document.querySelector("#catGridOrig");
    appendCatCardToGrid(grid, catCard);
  }
}

// Set up prevent initialize for testing purposes
let preventInitialize;
if (!preventInitialize) {
  initialize();
}

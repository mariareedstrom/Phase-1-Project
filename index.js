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
 *
 * @returns {HTMLElement} a cat card DOM element
 */
function renderCatCard(cat) {
  const catCard = document.createElement("section");
  catCard.classList.add("card", "hoverable", "growable", "cat-card");
  catCard.dataset.dna = cat.dna;

  const cardImg = document.createElement("div");
  cardImg.classList.add("card-image");

  const catImg = document.createElement("img");
  cardImg.append(catImg);

  const cardAction = document.createElement("footer");
  cardAction.classList.add("card-action");

  const favorite = document.createElement("span");
  favorite.classList.add("favorite");
  favorite.textContent = "♡";

  cardAction.append(favorite);
  catCard.append(cardImg, cardAction);

  return catCard;
}

//Get data and render cats to the DOM
function initialize() {
  const maxOrigCats = 4;
  for (let i = 0; i < maxOrigCats; i++) {
    // generate random Cat
    const cat = Cat.generateRandom();
    // render cat card
    const catCard = renderCatCard(cat);
    // fetch cat
    fetchCat(cat).then((catUrl) => {
      // apply to img tag
      const img = catCard.querySelector(".card-image img");
      img.src = catUrl;
    });
    // append card to the OG
    const column = document.createElement("div");
    column.classList.add("col", "s6", "m3");

    const catGrid = document.querySelector("#catGridOrig");

    column.append(catCard);
    catGrid.append(column);
  }
}

initialize();

//Mark cat as selected by adding "selected" dataset and class
/**
 *
 * @param {string} dna the cat dna to use for lookup
 *
 */
function selectCatByDNA(dna) {
  // use document.querySelector("[data-dna=]") to find cat by DNA
  const selectedCatCard = document.querySelector(`[data-dna=${dna}]`);

  // check if property is present, if not add selected dataset and class
  if ("selected" in selectedCatCard.dataset === false) {
    // set data-select
    selectedCatCard.dataset.selected = "true";

    // set selected class
    selectedCatCard.classList.add("selected");
  }
}

// Deselcet cat by removing "selected" dataset and class
/**
 *
 * @param {string} dna the cat to deselect
 *
 */
function deSelectCatByDNA(dna) {
  // use document.querySelector("[data-dna=]") to find cat by DNA
  const selectedCatCard = document.querySelector(`[data-dna=${dna}]`);

  // check if property is present, if it is remove selected dataset and class
  if ("selected" in selectedCatCard.dataset === true) {
    delete selectedCatCard.dataset.selected;
    selectedCatCard.classList.remove("selected");
  }
}

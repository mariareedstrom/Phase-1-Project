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

//Get data and render cats to the DOM
function initialize() {
  // create first cat and fetch
  const firstCat = Cat.generateRandom();
  fetchCat(firstCat).then((catUrl) => {
    // apply to img tag
    const img = document.querySelector("#catimg");
    img.src = catUrl;
  });
}

initialize();

//Cat Cards

/**
 * Create a cat card, with img, like btn, mate btn and comment section.
 *
 * @param {Cat} cat the fetched cat that will be rendered to the card.
 */
function renderCatCard(cat) {}

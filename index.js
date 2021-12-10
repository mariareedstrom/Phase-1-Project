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

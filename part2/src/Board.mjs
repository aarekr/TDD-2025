export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.string = '...\n...\n...\n';
    this.piece = '';
    this.hitBottom = false;
  }

  toString() {
    this.piece = '.';
    return this.string;
  }

  drop(piece) {
    if (this.piece != '') {
      throw new Error('already falling');
    }
    this.piece = piece;
    this.string = `.${this.piece}.\n...\n...\n`;
  }

  tick() {
    if (this.string === `.${this.piece}.\n...\n...\n`) {
      this.string = `...\n.${this.piece}.\n...\n`;
    } else if (this.string === `...\n.${this.piece}.\n...\n`) {
      this.string = `...\n...\n.${this.piece}.\n`;
    } else if (this.string === `...\n...\n.${this.piece}.\n` && this.hitBottom === false) {
      this.piece = '';
      this.hitBottom = true;
    } else if (this.string === `...\n...\n.${this.piece}.\n` && this.hitBottom === true) {
      this.piece = '';
      this.hitBottom = false;
    }
  }

  hasFalling() {
    return true;
  }
}

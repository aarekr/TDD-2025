export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.string = '...\n...\n...\n';
    this.piece = '';
  }

  toString() {
    return this.string;
  }

  drop(piece) {
    this.piece = piece;
    this.string = `.${this.piece}.\n...\n...\n`;
  }
  
  tick() {
    if (this.string === `.${this.piece}.\n...\n...\n`) {
      this.string = `...\n.${this.piece}.\n...\n`;
    } else if (this.string === `...\n.${this.piece}.\n...\n`) {
      this.string = `...\n...\n.${this.piece}.\n`;
    } else if (this.string === `...\n...\n.${this.piece}.\n`) {
      this.piece = '';
    }
  }
}

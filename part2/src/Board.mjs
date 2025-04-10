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
    this.string = `.` + this.piece + this.string.substring(2,);
  }

  tick() {
    if (this.string === `.${this.piece}` + this.string.substring(2,)) {
      this.string = `...\n.${this.piece}` + this.string.substring(6,);
    } else if (this.string === `...\n.${this.piece}.\n...\n`) {
      this.string = `...\n...\n.${this.piece}.\n`;
    } else if (this.string === `...\n.${this.piece}.\n.X.\n` && this.hitBottom === false) {
      this.hitBottom = true;
    } else if (this.string === `...\n.${this.piece}.\n.X.\n` && this.hitBottom === true) {
      let sign = this.piece;
      this.string = `...\n.${sign}.\n.X.\n`;
      this.piece = '';
      this.hitBottom = false;
    } else if (this.string === `...\n...\n.${this.piece}.\n` && this.hitBottom === false) {
      this.piece = '';
      this.hitBottom = true;
    } else if (this.string === `...\n...\n.${this.piece}.\n` && this.hitBottom === true) {
      let sign = this.piece;
      this.string = `...\n...\n.${sign}.\n`;
      this.piece = '';
      this.hitBottom = false;
    }
  }

  hasFalling() {
    if (this.string[5] !== '.' && this.string[9] !== '.') {
      if (this.hitBottom === true) return true;
      return false;
    }
    if (this.hitBottom === true) {
      return false;
    }
    return true;
  }
}

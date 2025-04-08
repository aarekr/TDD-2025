export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.string = '...\n...\n...\n';
  }

  toString() {
    return this.string;
  }

  drop() {
    this.string = '.X.\n...\n...\n';
  }
  
  tick() {
    if (this.string === '.X.\n...\n...\n') {
      this.string = '...\n.X.\n...\n';
    } else if (this.string === '...\n.X.\n...\n') {
      this.string = '...\n...\n.X.\n';
    }
  }
}

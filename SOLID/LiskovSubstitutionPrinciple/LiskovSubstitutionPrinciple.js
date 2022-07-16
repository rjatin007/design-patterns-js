// LSP
// objects of a superclass should be replaceable with objects of its subclasses without breaking the application

// class Rectangle {
//   constructor(width, height) {
//     this.width = width;
//     this.height = height;
//   }
//   get area() {
//     return this.height * this.width;
//   }
//   toString() {
//     return `Dimensions of ${this.width} x ${this.height}`;
//   }
// }

// let rc = new Rectangle(3, 4);
// console.log(rc.toString()); //Dimensions of 3 x 4

// subclass

// class Square extends Rectangle {
//   constructor(size) {
//     super(size, size);
//   }
// }

// let s = new Square(4);
// console.log(s.toString()); // Dimensions of 4 x 4

// now issue is that we can set the height or width of square to some thing else
// and then it won't be a square

// s.height = 10;
// console.log(s.toString()); //Dimensions of 4 x 10

// So we need to enforce this somehow

// One Solution is to re write both the parent and child classes:-

class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  set width(value) {
    this._width = value;
  }
  set height(value) {
    this._height = value;
  }
  get area() {
    return this._height * this._width;
  }
  toString() {
    return `Dimensions of ${this._width} x ${this._height}`;
  }
}

let rc = new Rectangle(3, 4);
console.log(rc.toString());

// subclass

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
  set width(value) {
    this._width = this._height = value;
  }
  set height(value) {
    this._width = this._height = value;
  }
}

let s = new Square(4);
console.log(s.toString());
s.height = 10;
console.log(s.toString()); // Dimensions of 10 x 10

// but there is a drawback that we can have function that works with base class  but fails with subclass

let useIt = function (rc) {
  //   let width = rc.width;
  //_width because width doesn't gets propagated to derived class
  let width = rc._width;
  rc.height = 20;
  console.log(`Expected area of ${20 * width}, but got ${rc.area}`);
};

useIt(rc); // Expected area of 60, but got 60
useIt(s); // Expected area of 200, but got 400

// So the LSP is broken
// Right solution is to completely get rid of derived class
// and put isSquare as a function to check when dimensions are equal and its a square

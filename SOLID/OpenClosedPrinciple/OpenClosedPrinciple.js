// It states that Objects are Open for extension, but Closed for modification

let Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});
let Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }
  // now its easy to add one more filter,
  // but this is  bad practice as this class might be in production, and we have changed it!

  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }
  // another thing is that we might get requirement to write filter
  // based on  both size and color or either size and color , will we be writing more and more filters?
  // The answer is to use specification pattern
  // The idea is to specify class based on specific criteria
}
// Color specification class
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }
  isSatisfied(item) {
    return item.color === this.color;
  }
}

// Size specification class
class SizeSpecification {
  constructor(size) {
    this.size = size;
  }
  isSatisfied(item) {
    return item.size === this.size;
  }
}

// Making combinator to combining specifications in AND(&&) fashion

class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }
  isSatisfied(item) {
    return this.specs.every((spec) => spec.isSatisfied(item));
  }
}

// Making combinator to combining specifications in OR(||) fashion

class OrSpecification {
  constructor(...specs) {
    this.specs = specs;
  }
  isSatisfied(item) {
    return this.specs.some((spec) => spec.isSatisfied(item));
  }
}

let apple = new Product("Apple", Color.green, Size.small);
let tree = new Product("Tree", Color.green, Size.large);
let house = new Product("House", Color.blue, Size.large);

let products = [apple, tree, house];

const pf = new ProductFilter();
console.log("Old approach: ");
for (let p of pf.filterByColor(products, Color.green)) {
  console.log(`${p.name} is green`);
}

class BetterFilter {
  filter(items, spec) {
    return items.filter((item) => spec.isSatisfied(item));
  }
}
console.log("New approach: ");

const bf = new BetterFilter();
const greenSpec = new ColorSpecification(Color.green);

for (let p of bf.filter(products, greenSpec)) {
  console.log(`${p.name} is green`);
}

console.log("Large and green products:- ");

const largeSpec = new SizeSpecification(Size.large);
const andSpec = new AndSpecification(greenSpec, largeSpec);

for (let p of bf.filter(products, andSpec)) {
  console.log(`${p.name} is large and green`);
}

console.log("Large or green products:- ");

const orSpec = new OrSpecification(greenSpec, largeSpec);
for (let p of bf.filter(products, andSpec)) {
  console.log(`${p.name} is large or green`);
}

// Some times this approach is not that scalable and maintainable
// So better approach is to use inheritance

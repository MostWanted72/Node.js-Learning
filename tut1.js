const person = {
  name: 'Praveen',
  age: 28,
  // this a function in object
  greet() {
    return `I am ${this.name} and I am ${this.age} years's old.`
  }
}

const toArray = (...args) => {
  console.log(args);
}

toArray(1, 2, 3, 4)
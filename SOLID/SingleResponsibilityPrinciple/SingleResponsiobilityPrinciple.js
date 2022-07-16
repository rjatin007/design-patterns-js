// A class should have a single responsibility

const fs = require("fs");

class Journal {
  constructor() {
    this.entries = [];
  }
  addEntry(text) {
    let c = ++Journal.count;

    let entry = `${c}:${text}`;
    this.entries[c] = entry;
    return c;
  }
  removeEntry(index) {
    delete this.entry[index];
  }
  toString() {
    return Object.values(this.entries).join("\n");
  }

  // Following is not directly related to journal,
  //   this is a second responsibility to Journal class
  //  So we comment this out and implement this in separate class.

  //   saveJournal(fileName){
  //     fs.writeFileSync(fileName,this.toString());
  //   }
  //   loadFile(fileName){
  //     //
  //   }
  //   loadFromUrl(){
  //     //
  //   }
}

class PersistantManager {
  constructor() {}
  preprocessJournal(j) {
    return j.toString();
  }
  saveJournal(fileName, j) {
    fs.writeFileSync(fileName, this.preprocessJournal(j));
  }
  loadFile(fileName) {
    //
  }
  loadFromUrl() {
    //
  }
}

Journal.count = 0;
let j = new Journal();
j.addEntry("Hello");
j.addEntry("bye");

console.log(j.toString());

const p = new PersistantManager();
const fileName = "./j.txt";
p.saveJournal(fileName, j);

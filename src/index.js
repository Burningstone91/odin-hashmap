import "./styles.css";
import { HashMap } from "./hashmap";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.get("lion"));
console.log(test.has("bananas"));

console.log(test.remove("dog"));
console.log(test);

console.log(test.length());
test.clear();
console.log(test);

// Example array of objects
const data = [
  { name: "John", age: 25, salary: 100 },
  { name: "Jane", age: 30, salary: 20 },
  { name: "Bob", age: 35, salary: 30 },
];

// Field to retrieve and sum
const field = "salary";

// Calculate the sum
const sum = data.reduce((accumulator, currentValue) => accumulator + currentValue[field], 0);

console.log(`Sum of ${field}: ${sum}`);

const my_string = "boy, girl, dog, cat";
const splitted = my_string.split(",");
splitted.forEach((element) => console.log(element));

const teamData = "Finland – Slovenia, Finland – Slovenia, Finland – Slovenia,";

// Split the data by commas
const teams = teamData.split(",")[0].trim();

// Trim whitespace and get the first team
// const firstTeam = teams[0].trim();

console.log(teams);

const str = "Finland – Slovenia".split(" – ")[0];

console.log(str);

const str1 = "Finland – Slovenia";
const teams1 = str1.split(" – ");

console.log(teams1[1]);

const arr = ["Finland – Slovenia"];
const newArray = arr[0].split(" – ").map((team) => team.trim());

console.log(newArray);


const array1 = [
  { name: "frank", age: "20" },
  { name: "Emma", age: "22" },
  { name: "John", age: "25" }
];

const array2 = [
  { name: "Alice", age: "30" },
  { name: "Emma", age: "22" },
  { name: "Bob", age: "28" },
  { name: "John", age: "25" },
  { name: "Eve", age: "23" }
];

// Create a Set of names from array1 for faster lookup
const namesToRemove = new Set(array1.map(item => item.name));

// Filter array2 to remove elements with names present in array1
const newArray2 = array2.filter(item => !namesToRemove.has(item.name));

console.log(newArray2);

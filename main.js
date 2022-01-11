// Lucas Hillier 101013357
// COMP4601 Assignment 2

const { matrixFile } = require("./matrixFile.js");
const { averageRatings } = require("./matrixAverage.js");
const { predictUser, predictItem } = require("./predict.js");

const test = matrixFile("./test_files/assignment2-data.txt");
const averages = averageRatings(test);

// User-based predictions
console.log("User-based:");
let numUser = 0;
let denomUser = 0;
const startUser = Date.now();

// For each user
test.forEach((user, i) => {
  // For each item
  user.forEach((item, j) => {
    // If rating == 0 => skip
    if (item != 0) {
      // sum => | predicted value - actual value |
      rec = predictUser(test, averages, i, j);
      numUser += Math.abs(rec - item);
    }
  });
  // Sum => size of the test set
  denomUser += user.filter(item => item != 0).length;
});

console.log(numUser / denomUser);
console.log(`Took ${(Date.now() - startUser) / 1000} seconds.`);
console.log("");

// Item-based predicitons
console.log("Item-based:");
let numItem = 0;
let denomItem = 0;
const startItem = Date.now();

// For each user
test.forEach((user, i) => {
  // For each item
  user.forEach((item, j) => {
    // If rating == 0 => skip
    if (item != 0) {
      // sum => | predicted value - actual value |
      rec = predictItem(test, averages, i, j);
      numItem += Math.abs(rec - item);
    }
  });
  // Sum => size of the test set
  denomItem += user.filter(item => item != 0).length;
});

console.log(numItem / denomItem);
console.log(`Took ${(Date.now() - startItem) / 1000} seconds.`);

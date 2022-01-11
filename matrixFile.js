// Lucas Hillier 101013357
// COMP4601 Assignment 2

const fs = require("fs");

// Read a file and return it as a matrix
function matrixFile(filename) {
  result = fs.readFileSync(filename, "utf-8", function(err, data) {
    if (err) throw err;
    return data;
  });
  const array = result.split(/\s/).filter(entry => entry != "");

  const users = parseInt(array[0]);
  const items = parseInt(array[1]);
  const ratings = array.slice(users + items + 2);

  // Turn the array into a matrix
  const matrix = [];
  for (i = 0; i < users * items; i += items) {
    matrix.push(ratings.slice(i, i + items));
  }

  // Parse the entries
  matrix.forEach((row, i) => {
    const parsedRow = [];
    row.forEach(item => {
      parsedRow.push(parseInt(item));
    });

    matrix[i] = parsedRow;
  });

  return matrix;
}

module.exports = {
  matrixFile
};

// Lucas Hillier 101013357
// COMP4601 Assignment 2

const { userSim } = require("./userSim.js");
const { itemSim } = require("./itemSim.js");
const {
  getNeighboursUser,
  getNeighboursItem,
  getNeighboursUserThresh,
  getNeighboursItemThresh
} = require("./nearest.js");

// Predict a given user's rating for a given item using user based
function predictUser(matrix, averages, user, item) {
  // Remove the rating we are predicting
  const newMatrix = matrix.map(row => row.slice());
  newMatrix[user][item] = 0;

  // Update the user's average rating
  const newAverages = averages.slice();
  const reviewed = newMatrix[user].filter(value => value > 0);
  newAverages[user] =
    reviewed.reduce((previous, current) => previous + current, 0) /
    reviewed.length;

  // Get user similarities
  const sims = userSim(newMatrix, newAverages, user);
  // const neighbours = getNeighboursUser(sims);
  const neighbours = getNeighboursUserThresh(sims);

  // Calc the prediction
  let num = 0;
  let denom = 0;
  neighbours.forEach(neighbour => {
    if (newMatrix[neighbour][item] > 0) {
      num +=
        sims[neighbour] * (newMatrix[neighbour][item] - newAverages[neighbour]);
      denom += sims[neighbour];
    }
  });

  const result = newAverages[user] + num / denom;

  if (isNaN(result)) {
    return newAverages[user];
  } else if (result < 1) {
    return 1;
  } else if (result > 5) {
    return 5;
  }

  return result;
}

// Predict a given user's rating for a given item using item based
function predictItem(matrix, averages, user, item) {
  // Remove the rating we are predicting
  const newMatrix = matrix.map(row => row.slice());
  newMatrix[user][item] = 0;

  // Update the user's average rating
  const newAverages = averages.slice();
  const reviewed = [];
  const rated = [];
  newMatrix[user].forEach((item, index) => {
    if (item > 0) {
      reviewed.push(item);
      rated.push(index);
    }
  });

  newAverages[user] =
    reviewed.reduce((previous, current) => previous + current, 0) /
    reviewed.length;

  // Get user similarities
  const sims = itemSim(newMatrix, newAverages, item);
  // const neighbours = getNeighboursItem(rated, sims);
  const neighbours = getNeighboursItemThresh(rated, sims);

  // Calc the prediction
  let num = 0;
  let denom = 0;
  neighbours.forEach(neighbour => {
    num += sims[neighbour] * newMatrix[user][neighbour];
    denom += sims[neighbour];
  });

  const result = num / denom;

  if (isNaN(result)) {
    return newAverages[user];
  } else if (result < 1) {
    return 1;
  } else if (result > 5) {
    return 5;
  }

  return result;
}

module.exports = {
  predictUser,
  predictItem
};

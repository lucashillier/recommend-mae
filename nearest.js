// Lucas Hillier 101013357
// COMP4601 Assignment 2

const neighbourhood = 9;
const thresh = 0;

function getNeighboursUser(sims) {
  // Get index of nearest neighbours
  const neighbours = [];
  for (let i = 0; i < sims.length; i++) {
    // Don't include negative sims
    if (sims[i] >= 0) {
      // If we have less than the neighbourhood size add it
      if (neighbours.length < neighbourhood) {
        neighbours.push(i);
        neighbours.sort((first, second) => sims[first] - sims[second]);
      } else if (sims[i] > sims[neighbours[0]]) {
        // If we are full, check if it is greater than the smallest sim
        neighbours[0] = i;
        neighbours.sort((first, second) => sims[first] - sims[second]);
      }
    }
  }
  return neighbours;
}

function getNeighboursItem(rated, sims) {
  // Get index of nearest neighbours
  const neighbours = [];
  for (let i = 0; i < sims.length; i++) {
    // Don't include negative sims or neighbours that havent rated the item
    if (sims[i] > 0 && rated.includes(i)) {
      // If we have less than the neighbourhood size add it
      if (neighbours.length < neighbourhood) {
        neighbours.push(i);
        neighbours.sort((first, second) => sims[first] - sims[second]);
      } else if (sims[i] > sims[neighbours[0]]) {
        // If we are full, check if it is greater than the smallest sim
        neighbours[0] = i;
        neighbours.sort((first, second) => sims[first] - sims[second]);
      }
    }
  }

  return neighbours;
}

function getNeighboursUserThresh(sims) {
  // Get index of nearest neighbours
  const neighbours = [];
  for (let i = 0; i < sims.length; i++) {
    // If the sim is above the threshold we add it
    if (sims[i] > thresh) {
      neighbours.push(i);
    }
  }
  return neighbours;
}

function getNeighboursItemThresh(rated, sims) {
  // Get index of nearest neighbours
  const neighbours = [];
  for (let i = 0; i < sims.length; i++) {
    // Don't include sims below threshold or neighbours that havent rated the item
    if (sims[i] > thresh && rated.includes(i)) {
      neighbours.push(i);
    }
  }

  return neighbours;
}

module.exports = {
  getNeighboursUser,
  getNeighboursItem,
  getNeighboursUserThresh,
  getNeighboursItemThresh
};

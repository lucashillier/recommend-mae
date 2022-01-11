// Lucas Hillier 101013357
// COMP4601 Assignment 2

// Get similarities for a given item
function itemSim(matrix, averages, item) {
  const sims = [];

  // Loop through all items
  for (item2 = 0; item2 < matrix[0].length; item2++) {
    // If it is the same item, set sim to -2 so that it is never used
    if (item == item2) {
      sims.push(-2);
    } else {
      // Set of users that have reviewed both products
      const matches = [];
      for (user = 0; user < matrix.length; user++) {
        if (matrix[user][item2] > 0 && matrix[user][item] > 0) {
          matches.push(user);
        }
      }

      let num = 0;
      let denomA = 0;
      let denomB = 0;

      matches.forEach(user => {
        let calcA = matrix[user][item] - averages[user];
        let calcB = matrix[user][item2] - averages[user];

        num += calcA * calcB;
        denomA += Math.pow(calcA, 2);
        denomB += Math.pow(calcB, 2);
      });

      const result = num / (Math.sqrt(denomA) * Math.sqrt(denomB));

      // push sim to array
      if (isNaN(result)) {
        sims.push(-1);
      } else {
        sims.push(result);
      }
    }
  }

  return sims;
}

module.exports = {
  itemSim
};

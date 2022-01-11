// Lucas Hillier 101013357
// COMP4601 Assignment 2

// Get user similarities for a given user
function userSim(matrix, averages, user) {
  const sims = [];

  // for each user
  matrix.forEach((row, i) => {
    // if same user => -2 so it is never used
    if (i == user) {
      sims.push(-2);
    } else {
      // Set of products that both users have reviewed
      const matches = [];
      for (item = 0; item < row.length; item++) {
        if (row[item] > 0 && matrix[user][item] > 0) {
          matches.push(item);
        }
      }

      let num = 0;
      let denomA = 0;
      let denomB = 0;

      // using all matching items calc sim
      matches.forEach(item => {
        let calcA = matrix[user][item] - averages[user];
        let calcB = row[item] - averages[i];

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
  });

  return sims;
}

module.exports = {
  userSim
};

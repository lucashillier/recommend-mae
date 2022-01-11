// Lucas Hillier 101013357
// COMP4601 Assignment 2

// Get each user's average rating
function averageRatings(matrix) {
  const averages = [];

  matrix.forEach(row => {
    const reviewed = row.filter(value => value != 0);
    averages.push(
      reviewed.reduce((previous, current) => previous + current, 0) /
        reviewed.length
    );
  });

  return averages;
}

module.exports = {
  averageRatings
};

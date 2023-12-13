import run from "aocrunner";

class Galaxy {
  row;
  col;
  expRow = 0;
  expCol = 0;

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  addExpRow() {
    this.expRow++;
  }

  addExpRow2() {
    this.expRow += 999999;
  }

  addExpCol() {
    this.expCol++;
  }

  addExpCol2() {
    this.expCol += 999999;
  }

  expand() {
    this.row += this.expRow;
    this.col += this.expCol;
    this.expRow = 0;
    this.expCol = 0;
  }
}

function getDistance(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(""));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let galaxies = [];
  let emptyRows = new Set();
  let emptyCols = new Set();

  input.forEach((row, i) => {
    if (row.every((char) => char === ".")) {
      emptyRows.add(i);
    }
  });

  for (let i = 0; i < input[0].length; i++) {
    if (input.every((row) => row[i] === ".")) {
      emptyCols.add(i);
    }
  }

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === "#") {
        galaxies.push(new Galaxy(row, col));
      }
    }
  }

  emptyRows.forEach((row) => {
    galaxies.forEach((galaxy) => {
      if (galaxy.row > row) {
        galaxy.addExpRow();
      }
    });
  });

  emptyCols.forEach((col) => {
    galaxies.forEach((galaxy) => {
      if (galaxy.col > col) {
        galaxy.addExpCol();
      }
    });
  });

  galaxies.forEach((galaxy) => galaxy.expand());

  let totalDistance = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      totalDistance += getDistance(galaxies[i], galaxies[j]);
    }
  }

  return totalDistance;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let galaxies = [];
  let emptyRows = new Set();
  let emptyCols = new Set();

  input.forEach((row, i) => {
    if (row.every((char) => char === ".")) {
      emptyRows.add(i);
    }
  });

  for (let i = 0; i < input[0].length; i++) {
    if (input.every((row) => row[i] === ".")) {
      emptyCols.add(i);
    }
  }

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === "#") {
        galaxies.push(new Galaxy(row, col));
      }
    }
  }

  emptyRows.forEach((row) => {
    galaxies.forEach((galaxy) => {
      if (galaxy.row > row) {
        galaxy.addExpRow2();
      }
    });
  });

  emptyCols.forEach((col) => {
    galaxies.forEach((galaxy) => {
      if (galaxy.col > col) {
        galaxy.addExpCol2();
      }
    });
  });

  galaxies.forEach((galaxy) => galaxy.expand());

  let totalDistance = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      totalDistance += getDistance(galaxies[i], galaxies[j]);
    }
  }

  return totalDistance;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....`,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

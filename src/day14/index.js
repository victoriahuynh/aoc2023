import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(""));

function spinNorth(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "O") {
        for (let i = y - 1; i >= 0; i--) {
          if (grid[i][x] === "#" || grid[i][x] === "O") {
            grid[y][x] = ".";
            grid[i + 1][x] = "O";
            break;
          }
          if (i === 0) {
            grid[y][x] = ".";
            grid[i][x] = "O";
            break;
          }
        }
      }
    }
  }
}

function spinSouth(grid) {
  for (let y = grid.length - 1; y >= 0; y--) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "O") {
        for (let i = y + 1; i < grid.length; i++) {
          if (grid[i][x] === "#" || grid[i][x] === "O") {
            grid[y][x] = ".";
            grid[i - 1][x] = "O";
            break;
          }
          if (i === grid.length - 1) {
            grid[y][x] = ".";
            grid[grid.length - 1][x] = "O";
            break;
          }
        }
      }
    }
  }
}

function spinWest(grid) {
  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] === "O") {
        for (let i = x - 1; i >= 0; i--) {
          if (grid[y][i] === "#" || grid[y][i] === "O") {
            grid[y][x] = ".";
            grid[y][i + 1] = "O";
            break;
          }
          if (i === 0) {
            grid[y][x] = ".";
            grid[y][i] = "O";
            break;
          }
        }
      }
    }
  }
}

function spinEast(grid) {
  for (let x = grid[0].length - 1; x >= 0; x--) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] === "O") {
        for (let i = x + 1; i < grid[y].length; i++) {
          if (grid[y][i] === "#" || grid[y][i] === "O") {
            grid[y][x] = ".";
            grid[y][i - 1] = "O";
            break;
          }
          if (i === grid[y].length - 1) {
            grid[y][x] = ".";
            grid[y][grid[y].length - 1] = "O";
            break;
          }
        }
      }
    }
  }
}

function spinCycle(grid) {
  spinNorth(grid);
  spinWest(grid);
  spinSouth(grid);
  spinEast(grid);

  return grid;
}

function getTotalLoad(grid) {
  let total = 0;
  for (let y = grid.length - 1; y >= 0; y--) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "O") {
        total += grid.length - y;
      }
    }
  }
  return total;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  spinNorth(input);

  console.log(input.map((line) => line.join("")).join("\n"));
  return getTotalLoad(input);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const pastCycles = new Set();
  const pastCyclesMap = new Map();
  let totalLoad = 0;

  for (let i = 0; i < 1000000000; i++) {
    let grid = spinCycle(input);
    const gridString = grid.map((line) => line.join("")).join("\n");
    if (pastCycles.has(gridString)) {
      const cycleStart = pastCyclesMap.get(gridString);
      const cycleLength = i - cycleStart;
      const cycleIndex = (1000000000 - 1 - cycleStart) % cycleLength;

      for (let j = 0; j < cycleIndex; j++) {
        spinCycle(grid);
      }

      totalLoad = getTotalLoad(grid);
      break;
    }
    pastCycles.add(gridString);
    pastCyclesMap.set(gridString, i);
  }
  console.log(input.map((line) => line.join("")).join("\n"));
  return totalLoad;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....`,
        expected: 136,
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
      {
        input: `O....#....\nO.OO#....#\n.....##...\nOO.#O....O\n.O.....O#.\nO.#..O.#.#\n..O..#O..O\n.......O..\n#....###..\n#OO..#....`,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(""));

function getS(grid) {
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (char === "S") {
        return { char: "S", row: j, col: i, step: 0 };
      }
    }
  }
}

let grid;
let queue = [];
let visited = [];

const part1 = (rawInput) => {
  grid = [];
  queue = [];
  visited = [];

  const input = parseInput(rawInput);

  grid = input;

  grid.forEach((row, i) => {
    row.unshift(".");
    row.push(".");
  });

  grid.unshift(Array(grid[0].length).fill("."));
  grid.push(Array(grid[0].length).fill("."));

  const start = getS(input);

  queue.push(start);
  visited.push(start);

  while (queue.length > 0) {
    // console.log(queue);
    let pipe = queue.shift();
    let neighbors = getNeighbors(pipe);
    // console.log(neighbors);
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      let visitedContains = visited.some(
        (tile) => tile.row === neighbor.row && tile.col === neighbor.col,
      );
      if (!visitedContains) {
        visited.push(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return getHighestSteps(visited);
};

function getHighestSteps(visited) {
  let highest = visited[0].step;
  for (let i = 0; i < visited.length; i++) {
    let tile = visited[i];
    if (tile.step > highest) {
      highest = tile.step;
    }
  }
  return highest;
}

function getNeighbors(tile) {
  let neighbors = [];
  if (tile.char === "|") {
    neighbors.push({
      char: grid[tile.col - 1][tile.row],
      row: tile.row,
      col: tile.col - 1,
      step: tile.step + 1,
    });
    neighbors.push({
      char: grid[tile.col + 1][tile.row],
      row: tile.row,
      col: tile.col + 1,
      step: tile.step + 1,
    });
  } else if (tile.char === "-") {
    neighbors.push({
      char: grid[tile.col][tile.row - 1],
      row: tile.row - 1,
      col: tile.col,
      step: tile.step + 1,
    });
    neighbors.push({
      char: grid[tile.col][tile.row + 1],
      row: tile.row + 1,
      col: tile.col,
      step: tile.step + 1,
    });
  } else if (tile.char === "L") {
    neighbors.push({
      char: grid[tile.col - 1][tile.row],
      row: tile.row,
      col: tile.col - 1,
      step: tile.step + 1,
    });
    neighbors.push({
      char: grid[tile.col][tile.row + 1],
      row: tile.row + 1,
      col: tile.col,
      step: tile.step + 1,
    });
  } else if (tile.char === "J") {
    neighbors.push({
      char: grid[tile.col - 1][tile.row],
      row: tile.row,
      col: tile.col - 1,
      step: tile.step + 1,
    });
    neighbors.push({
      char: grid[tile.col][tile.row - 1],
      row: tile.row - 1,
      col: tile.col,
      step: tile.step + 1,
    });
  } else if (tile.char === "7") {
    neighbors.push({
      char: grid[tile.col][tile.row - 1],
      row: tile.row - 1,
      col: tile.col,
      step: tile.step + 1,
    });
    neighbors.push({
      char: grid[tile.col + 1][tile.row],
      row: tile.row,
      col: tile.col + 1,
      step: tile.step + 1,
    });
  } else if (tile.char === "F") {
    neighbors.push({
      char: grid[tile.col][tile.row + 1],
      row: tile.row + 1,
      col: tile.col,
      step: tile.step + 1,
    });
    neighbors.push({
      char: grid[tile.col + 1][tile.row],
      row: tile.row,
      col: tile.col + 1,
      step: tile.step + 1,
    });
  } else if (tile.char === "S") {
    if (
      grid[tile.col - 1][tile.row] === "|" ||
      grid[tile.col - 1][tile.row] === "7" ||
      grid[tile.col - 1][tile.row] === "F"
    ) {
      neighbors.push({
        char: grid[tile.col - 1][tile.row],
        row: tile.row,
        col: tile.col - 1,
        step: tile.step + 1,
      });
    }
    if (
      grid[tile.col + 1][tile.row] === "|" ||
      grid[tile.col + 1][tile.row] === "L" ||
      grid[tile.col + 1][tile.row] === "J"
    ) {
      neighbors.push({
        char: grid[tile.col + 1][tile.row],
        row: tile.row,
        col: tile.col + 1,
        step: tile.step + 1,
      });
    }
    if (
      grid[tile.col][tile.row - 1] === "-" ||
      grid[tile.col][tile.row - 1] === "L" ||
      grid[tile.col][tile.row - 1] === "F"
    ) {
      neighbors.push({
        char: grid[tile.col][tile.row - 1],
        row: tile.row - 1,
        col: tile.col,
        step: tile.step + 1,
      });
    }
    if (
      grid[tile.col][tile.row + 1] === "-" ||
      grid[tile.col][tile.row + 1] === "J" ||
      grid[tile.col][tile.row + 1] === "7"
    ) {
      neighbors.push({
        char: grid[tile.col][tile.row + 1],
        row: tile.row + 1,
        col: tile.col,
        step: tile.step + 1,
      });
    }
  }
  return neighbors;
}

function getArea(x, y) {
  let area = 0;
  let sum = 0;
  for (let i = 0; i < x.length - 1; i++) {
    sum += x[i] * y[i + 1] - x[i + 1] * y[i];
  }
  area = Math.abs(sum / 2);
  return area;
}

const part2 = (rawInput) => {
  part1(rawInput);
  let l = [];
  let w = [];
  let a = [];
  visited.forEach((tile, i) => {
    i % 2 === 0 ? l.push(tile) : w.unshift(tile);
  });
  a = l.concat(w);
  let boundaries = [];
  a.forEach((e) => {
    if (
      e.char === "S" ||
      e.char === "7" ||
      e.char === "F" ||
      e.char === "L" ||
      e.char === "J"
    ) {
      boundaries.push(e);
    }
  });

  let x = [];
  let y = [];
  boundaries.forEach((e) => {
    x.push(e.col);
    y.push(e.row);
  });
  x.push(boundaries[0].col);
  y.push(boundaries[0].row);
  let area = getArea(x, y);

  return area + 1 - visited.length / 2;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `.....\n.S-7.\n.|.|.\n.L-J.\n.....`,
        expected: 4,
      },
      {
        input: `..F7.\n.FJ|.\nSJ.L7\n|F--J\nLJ...`,
        expected: 8,
      },
      {
        input: `7-F7-\n.FJ|7\nSJLL7\n|F--J\nLJ.LJ`,
        expected: 8,
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
        input: `...........\n.S-------7.\n.|F-----7|.\n.||.....||.\n.||.....||.\n.|L-7.F-J|.\n.|..|.|..|.\n.L--J.L--J.\n...........`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

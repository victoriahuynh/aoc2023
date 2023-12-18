import run from "aocrunner";
import { Heap } from "heap-js";

const directions = {
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
  up: { x: 0, y: -1 },
};

const neighbors = Object.values(directions);

const parseInput = (rawInput) => {
  const blocks = rawInput.split("\n").map((line, y) =>
    line.split("").map((char, x) => {
      return {
        x,
        y,
        val: parseInt(char),
      };
    }),
  );
  return blocks;
};

class Visited {
  visited = new Set();
  minSteps = 0;
  maxSteps = 0;

  constructor(minSteps, maxSteps) {
    this.minSteps = minSteps;
    this.maxSteps = maxSteps;
  }

  check({ row, col, rowDir, colDir, consecutive }) {
    const key =
      (row << 24) |
      (col << 16) |
      ((rowDir & 3) << 14) |
      ((colDir & 3) << 12) |
      consecutive;

    if (this.visited.has(key)) {
      return true;
    }

    if (consecutive >= this.minSteps) {
      for (let i = 0; i <= this.maxSteps - consecutive; ++i) {
        this.visited.add(key + i);
      }
    } else {
      this.visited.add(key);
    }

    return false;
  }
}

function checkNeighbor(
  cityMap,
  positions,
  pos,
  rowDir,
  colDir,
  minSteps,
  maxSteps,
) {
  const nextRow = pos.row + rowDir;
  const nextCol = pos.col + colDir;
  const sameDirection = rowDir === pos.rowDir && colDir === pos.colDir;

  // boundary check
  if (
    nextRow < 0 ||
    nextRow >= cityMap.length ||
    nextCol < 0 ||
    nextCol >= cityMap[0].length
  ) {
    return;
  }
  // backwards check
  if (rowDir === -pos.rowDir && colDir === -pos.colDir) {
    return;
  }
  // max steps check
  if (pos.consecutive === maxSteps && sameDirection) {
    return;
  }
  // min steps check
  if (
    pos.consecutive < minSteps &&
    !sameDirection &&
    !(pos.row === 0 && pos.col === 0)
  ) {
    return;
  }

  positions.push({
    parent: pos,
    row: nextRow,
    col: nextCol,
    rowDir,
    colDir,
    consecutive: sameDirection ? pos.consecutive + 1 : 1,
    heat: pos.heat + cityMap[nextRow][nextCol].val,
  });
}

function tracePath(pos) {
  const path = [pos];

  while (pos.parent) {
    path.push(pos.parent);
    pos = pos.parent;
  }

  return path;
}

function findPath(cityMap, start, end, minSteps, maxSteps) {
  const positions = new Heap((a, b) => a.heat - b.heat);
  const visited = new Visited(minSteps, maxSteps);

  positions.push({
    row: start.x,
    col: start.y,
    rowDir: 0,
    colDir: 0,
    consecutive: 0,
    heat: 0,
  });

  while (positions.length > 0) {
    const pos = positions.pop();

    if (visited.check(pos)) {
      continue;
    }

    if (pos.row === end.y && pos.col === end.x && pos.consecutive >= minSteps) {
      return {
        path: tracePath(pos),
        pos,
        heat: pos.heat,
      };
    }

    neighbors.forEach((direction) => {
      checkNeighbor(
        cityMap,
        positions,
        pos,
        direction.x,
        direction.y,
        minSteps,
        maxSteps,
      );
    });
  }
}

const part1 = (rawInput) => {
  const cityMap = parseInput(rawInput);
  const start = cityMap[0][0];
  const end = cityMap[cityMap.length - 1][cityMap[0].length - 1];
  const { path, heat } = findPath(cityMap, start, end, 0, 3);

  displayCityMap(cityMap, path);

  return heat;
};

const part2 = (rawInput) => {
  const cityMap = parseInput(rawInput);
  const start = cityMap[0][0];
  const end = cityMap[cityMap.length - 1][cityMap[0].length - 1];
  const { path, heat } = findPath(cityMap, start, end, 4, 10);

  displayCityMap(cityMap, path);

  return heat;
};

function displayCityMap(cityMap, path) {
  const map = cityMap.map((row) => row.map((col) => "."));
  path.forEach((pos) => {
    map[pos.row][pos.col] = "X";
  });
  console.log(map.map((row) => row.join("")).join("\n"));
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`,
        expected: 102,
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
        input: `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`,
        expected: 94,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(""));

const DIR = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];
const [N, E, S, W] = [0, 1, 2, 3];
const DIR_MAP = {
  ".": [[N], [E], [S], [W]],
  "|": [[N], [N, S], [S], [N, S]],
  "-": [[E, W], [E], [E, W], [W]],
  "/": [[E], [N], [W], [S]],
  "\\": [[W], [S], [E], [N]],
};

const getNextDirs = (tile, dir) => {
  if (!tile) {
    return [];
  }
  const dirs = DIR_MAP[tile][dir];
  return dirs;
};

const getMove = (pos, dir) => {
  return {
    y: pos.y + DIR[dir][1],
    x: pos.x + DIR[dir][0],
  };
};

const energize = (map, start) => {
  let beams = [start];
  const visited = new Set();
  const energized = new Set();
  while (beams.length != 0) {
    let newBeams = [];
    for (let i = 0; i < beams.length; i++) {
      const beam = beams[i];

      const key = `${beam.pos.y},${beam.pos.x}`;
      visited.add([key, beam.dir].join(","));
      energized.add(key);

      const tile = map[beam.pos.y] ? map[beam.pos.y][beam.pos.x] : null;
      const nextDirs = getNextDirs(tile, beam.dir);
      for (const dir of nextDirs) {
        const newBeam = {
          pos: getMove(beam.pos, dir),
          dir: dir,
        };

        // out of bounds
        if (!map[newBeam.pos.y] || !map[newBeam.pos.y][newBeam.pos.x]) {
          continue;
        }

        // visited in the same direction
        const newKey = `${newBeam.pos.y},${newBeam.pos.x},${newBeam.dir}`;
        if (visited.has(newKey)) {
          continue;
        }
        newBeams.push(newBeam);
      }
    }
    beams = newBeams;
  }
  return energized.size;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const result = energize(input, { pos: { y: 0, x: 0 }, dir: E });
  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const starts = [];
  for (let i = 0; i < input.length; i++) {
    starts.push({ pos: { y: i, x: 0 }, dir: E });
    starts.push({ pos: { y: i, x: input[i].length - 1 }, dir: W });
  }
  for (let j = 0; j < input[0].length; j++) {
    starts.push({ pos: { y: 0, x: j }, dir: S });
    starts.push({ pos: { y: input.length - 1, x: j }, dir: N });
  }

  let max = 0;
  for (const start of starts) {
    const result = energize(input, start);
    if (result > max) {
      max = result;
    }
  }

  return max;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`,
        expected: 46,
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
        input: `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`,
        expected: 51,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

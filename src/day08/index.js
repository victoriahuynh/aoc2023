import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

function parseMaps(input) {
  let [instrs, maps] = input.split("\n\n");
  instrs = instrs.split("");
  maps = maps.split("\n").map((map) => map.split(" = "));
  const map = {};
  for (let i = 0; i < maps.length; i++) {
    map[maps[i][0]] = maps[i][1].replace(/[\(\)]/g, "").split(", ");
  }
  return [instrs, map];
}

function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function gcd(a, b) {
  let t = 0;
  a < b && ((t = b), (b = a), (a = t));
  t = a % b;
  return t ? gcd(b, t) : b;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const [instrs, map] = parseMaps(input);

  let step = 0;
  let node = "AAA";
  while (node !== "ZZZ") {
    node = map[node][instrs[step % instrs.length] === "L" ? 0 : 1];
    step++;
  }

  return step;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const [instructions, map] = parseMaps(input);
  let step = 0;
  let node = [...Object.keys(map)].filter((map) => map[2] === "A");
  while (node.some((c) => isNaN(c))) {
    for (let i = 0; i < node.length; i++) {
      if (node[i][2] === "Z") {
        node[i] = step;
      }
      if (!isNaN(node[i])) {
        continue;
      }
      node[i] =
        map[node[i]][instructions[step % instructions.length] === "L" ? 0 : 1];
    }
    step++;
  }

  return node.reduce((acc, c) => lcm(acc, c), 1);
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `RL\n\nAAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)`,
        expected: 2,
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
        input: `LR\n\n11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)\nXXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let times = input[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((x) => x !== "");
  let distances = input[1]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((x) => x !== "");

  let allWinningTimes = [];

  for (let i = 0; i < times.length; i++) {
    let time = parseInt(times[i]);
    let distance = parseInt(distances[i]);
    let winningTimes = 0;

    for (let j = 0; j <= time; j++) {
      if (j * (time - j) > distance) {
        winningTimes++;
      }
    }
    allWinningTimes.push(winningTimes);
  }

  return allWinningTimes.reduce((a, b) => a * b, 1);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let times = input[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((x) => x !== "");
  let distances = input[1]
    .split(":")[1]
    .trim()
    .split(" ")
    .filter((x) => x !== "");

  let actualTime = parseInt(times.join(""));
  let actualDistance = parseInt(distances.join(""));

  let winningTimes = 0;

  for (let j = 0; j <= actualTime; j++) {
    if (j * (actualTime - j) > actualDistance) {
      winningTimes++;
    }
  }

  return winningTimes;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: "Time:      7  15   30\nDistance:  9  40  200",
        expected: 288,
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
        input: "Time:      7  15   30\nDistance:  9  40  200",
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

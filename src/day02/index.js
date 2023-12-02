import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const bagCubes = new Map();
bagCubes.set("red", 12);
bagCubes.set("green", 13);
bagCubes.set("blue", 14);

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let validGameSum = 0;
  input.forEach((line) => {
    const gameNum = parseInt(line.substring(0, line.indexOf(":")).split(" ")[1]);
    const gameSets = line.slice(line.indexOf(":") + 1).trim().split(";");
    let validGame = true;
    for (let i = 0; i < gameSets.length; i++) {
      const cubeReveals = gameSets[i].trim().split(",");
      for (let j = 0; j < cubeReveals.length; j++) {
        const cube = cubeReveals[j].trim().split(" ");
        const cubeNum = parseInt(cube[0]);
        const cubeColor = cube[1];
        if (cubeNum > bagCubes.get(cubeColor) ) {
          validGame = false;
          break;
        }
      }
    }
    if (validGame) {
      validGameSum += gameNum;
    }
  });
  return validGameSum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let powerGameSum = 0;
  input.forEach((line) => {
    const gameSets = line.slice(line.indexOf(":") + 1).trim().split(";");
    let maxRedCubes = 0;
    let maxGreenCubes = 0;
    let maxBlueCubes = 0;
    for (let i = 0; i < gameSets.length; i++) {
      const cubeReveals = gameSets[i].trim().split(",");
      for (let j = 0; j < cubeReveals.length; j++) {
        const cube = cubeReveals[j].trim().split(" ");
        const cubeNum = parseInt(cube[0]);
        const cubeColor = cube[1];
        if (cubeColor === "red") {
          maxRedCubes = Math.max(maxRedCubes, cubeNum);
        } else if (cubeColor === "green") {
      maxGreenCubes = Math.max(maxGreenCubes, cubeNum);
        } else if (cubeColor === "blue") {
      maxBlueCubes = Math.max(maxBlueCubes, cubeNum);
        }
      }
    }
    const power = maxRedCubes * maxGreenCubes * maxBlueCubes;
    powerGameSum += power;
  });
  return powerGameSum;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1, 
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",s
      // },
      { input: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green", expected: 48 },
      { input: "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red", expected: 12 },
       {
        input: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
        expected: 2286,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

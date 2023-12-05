import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

function getLocationFromSeed(seed, map) {
  let currSeed = seed;
  for (const mapLine of map) {
    // console.log(mapLine);
    const { destRange, sourceRange, rangeLength } = mapLine;
    if (currSeed >= sourceRange && currSeed <= sourceRange + rangeLength - 1) {
      currSeed = destRange + (currSeed - sourceRange);
      break;
    }
  }
  // console.log("CURRSEED " + currSeed);
  return currSeed;
}

function getSeedFromLocation(location, map) {
  let currLocation = location;
  for (const mapLine of map) {
    // console.log(currLocation);
    // console.log(mapLine);
    const { destRange, sourceRange, rangeLength } = mapLine;
    if (
      currLocation >= destRange &&
      currLocation <= destRange + rangeLength - 1
    ) {
      currLocation = sourceRange + (currLocation - destRange);
      break;
    }
  }
  // console.log("CURRSEED " + currLocation);
  return currLocation;
}

function validSeed(seed, seeds) {
  for (let i = 0; i < seeds.length; i += 2) {
    if (seed >= seeds[i] && seed < seeds[i] + seeds[i + 1]) return true;
  }
  return false;
}

function backwardsWoohoo(seeds, ranges) {
  for (let i = 0; i < Math.max(...seeds); i++) {
    let potentialSeed = i;
    // console.log("NEW SEED " + i);
    ranges.forEach((range) => {
      potentialSeed = getSeedFromLocation(potentialSeed, range);
      // console.log("potentialSeed " + potentialSeed);
    });
    if (validSeed(potentialSeed, seeds)) {
      console.log(potentialSeed + " is valid " + i);
      return i;
    }
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let currSourceName = "";
  let currTargetName = "";
  let bigMap = new Map();

  const seeds = input[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((x) => parseInt(x));

  for (let i = 1; i < input.length; i++) {
    if (input[i].includes("map")) {
      const mapName = input[i].trim().split(" ")[0].split("-");
      currSourceName = mapName[0];
      currTargetName = mapName[2];
      bigMap.set(`${currSourceName}-${currTargetName}`, []);
    } else if (input[i] !== "") {
      const mapLine = input[i]
        .trim()
        .split(" ")
        .map((x) => parseInt(x));
      const destRange = mapLine[0];
      const sourceRange = mapLine[1];
      const rangeLength = mapLine[2];
      bigMap
        .get(`${currSourceName}-${currTargetName}`)
        .push({ destRange, sourceRange, rangeLength });
    } else if (input[i] === "") {
      currSourceName = "";
      currTargetName = "";
    }
  }

  bigMap.forEach((value, key) => {
    seeds.forEach((seed, idx) => {
      seeds[idx] = getLocationFromSeed(seed, value);
    });
  });

  return Math.min(...seeds);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let currSourceName = "";
  let currTargetName = "";
  let bigMap = new Map();
  let ranges = [];

  const seeds = input[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((x) => parseInt(x));

  /*

  const expandedSeeds = [];

  for (let s = 1; s < seeds.length; s++) {
    if (s % 2 == 1) {
      for (let j = seeds[s - 1]; j <= seeds[s - 1] + seeds[s]; j++) {
        expandedSeeds.push(j);
      }
    }
  }
  */

  for (let i = 1; i < input.length; i++) {
    if (input[i].includes("map")) {
      const mapName = input[i].trim().split(" ")[0].split("-");
      currSourceName = mapName[0];
      currTargetName = mapName[2];
      bigMap.set(`${currSourceName}-${currTargetName}`, []);
    } else if (input[i] !== "") {
      const mapLine = input[i]
        .trim()
        .split(" ")
        .map((x) => parseInt(x));
      const destRange = mapLine[0];
      const sourceRange = mapLine[1];
      const rangeLength = mapLine[2];
      bigMap
        .get(`${currSourceName}-${currTargetName}`)
        .push({ destRange, sourceRange, rangeLength });
      // console.log(mapLines);
    } else if (input[i] === "") {
      // console.log("RESET");
      currSourceName = "";
      currTargetName = "";
    }
  }

  /*
  bigMap.forEach((value, key) => {
    // console.log(key);
    // console.log(value);
    expandedSeeds.forEach((seed, idx) => {
      expandedSeeds[idx] = getLocationFromSeed(seed, value);
    });
  });
  */

  let reverseRanges = Array.from(bigMap.values()).reverse();

  // console.log(validSeed(testSeed, expandedSeeds));

  // console.log(testSeed);

  const lowestLocation = backwardsWoohoo(seeds, reverseRanges);

  return lowestLocation;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input:
          "seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48n\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15\n\nfertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4\n\nwater-to-light map:\n88 18 7\n18 25 70\n\nlight-to-temperature map:\n45 77 23\n81 45 19\n68 64 13\n\ntemperature-to-humidity map:\n0 69 1\n1 0 69\n\nhumidity-to-location map:\n60 56 37\n56 93 4",
        expected: 35,
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
        input:
          "seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48n\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15\n\nfertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4\n\nwater-to-light map:\n88 18 7\n18 25 70\n\nlight-to-temperature map:\n45 77 23\n81 45 19\n68 64 13\n\ntemperature-to-humidity map:\n0 69 1\n1 0 69\n\nhumidity-to-location map:\n60 56 37\n56 93 4",
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

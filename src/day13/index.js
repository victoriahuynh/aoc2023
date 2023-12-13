import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n\n");

function getDifferences(a, b) {
  let diffCount = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diffCount++;
  }
  return diffCount;
}

function checkReflection(mirror, smudges = 0) {
  for (let r = 0; r < mirror.length - 1; r++) {
    let differences = getDifferences(mirror[r], mirror[r + 1]);
    if (differences <= smudges) {
      let beforeRows = r;
      let afterRows = mirror.length - r;
      for (let i = 0; i < Math.min(beforeRows, afterRows); i++) {
        const botRow = r - i - 1;
        const upRow = r + i + 2;
        if (botRow < 0 || upRow >= mirror.length) break;
        differences += getDifferences(mirror[botRow], mirror[upRow]);
      }
      if (differences === smudges) {
        return r + 1;
      }
    }
  }
  return 0;
}

function transpose(arr) {
  const result = [];

  for (let i = 0; i < arr[0].length; i++) {
    const col = [];
    for (let j = 0; j < arr.length; j++) {
      col.push(arr[j][i]);
    }
    result.push(col);
  }

  return result;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let mirrors = [];

  input.forEach((line) => {
    mirrors.push(line.split("\n").map((row) => row.split("")));
  });

  let vertical = 0;
  let horizontal = 0;

  mirrors.forEach((mirror) => {
    horizontal += checkReflection(mirror, 0);

    const transposedMirror = transpose(mirror);

    vertical += checkReflection(transposedMirror, 0);
  });

  return horizontal * 100 + vertical;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let mirrors = [];

  input.forEach((line) => {
    mirrors.push(line.split("\n").map((row) => row.split("")));
  });

  let vertical = 0;
  let horizontal = 0;

  mirrors.forEach((mirror) => {
    horizontal += checkReflection(mirror, 1);

    const transposedMirror = transpose(mirror);

    vertical += checkReflection(transposedMirror, 1);
  });

  return horizontal * 100 + vertical;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },

      {
        input: `#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.\n\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#\n`,
        expected: 405,
      },
      {
        input: `\n#...##..#\n#....#..#\n..##..###\n#####.##.\n#####.##.\n..##..###\n#....#..#\n#...##..# `,
        expected: 400,
      },
      {
        input: `#.##..##.\n..#.##.#.\n##......#\n##......#\n..#.##.#.\n..##..##.\n#.#.##.#.`,
        expected: 5,
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
  onlyTests: true,
});

// my first attempt before I realized the reflection is not always evenly in the middle rip

/*
function compareArrays(a, b) {
  return a.every((element, index) => element === b[index]);
}

function checkHorizontal(mirror, splitIdx) {
  const firstHalf = mirror.slice(0, Math.ceil(mirror.length / 2));
  const secondHalf = mirror.slice(Math.ceil(mirror.length / 2));
  let aboveRows = firstHalf.length;

  if (mirror.length % 2 !== 0) {
    firstHalf.splice(0, 1);
  }

  secondHalf.reverse();

  let differentCount = 0;

  for (let i = 0; i < firstHalf.length; i++) {
    if (!compareArrays(firstHalf[i], secondHalf[i])) {
      differentCount++;
    }
  }

  return [differentCount === 0, aboveRows];
}

function checkVertical(mirror, splitIdx) {
  mirror.forEach((row) => {
    const firstHalf = row.slice(0, splitIdx);
    const secondHalf = row.slice(splitIdx);
    leftCols = firstHalf.length;

    if (firstHalf.length > secondHalf.length) {
      firstHalf.splice(0, firstHalf.length - secondHalf.length);
    } else if (secondHalf.length > firstHalf.length) {
      secondHalf.splice(0, firstHalf.length - secondHalf.length);
    }

    secondHalf.reverse();

    console.log("1", firstHalf);
    console.log("2", secondHalf);

    for (let i = 0; i < firstHalf.length; i++) {
      if (firstHalf[i] !== secondHalf[i]) {
        differentCount++;
      }
    }
  });
    return [differentCount === 0, leftCols];
  }
  */

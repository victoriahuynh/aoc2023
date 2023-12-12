import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((line) => line.split(" "))
    .map((line) => {
      return {
        springs: line[0],
        record: line[1].split(",").map((n) => parseInt(n)),
      };
    });

// si = curr pos in spring row
// ri = curr pos in record blocks
// curr = length of current block of #
function getArrangements(memo, springs, records, si, ri, curr) {
  const key = `${si},${ri},${curr}`;
  if (key in memo) {
    return memo[key];
  }
  if (si === springs.length) {
    if (ri === records.length && curr === 0) {
      return 1;
    } else if (ri == records.length - 1 && records[ri] === curr) {
      return 1;
    } else {
      return 0;
    }
  }
  let ret = 0;
  for (const c of [".", "#"]) {
    if (springs[si] === c || springs[si] === "?") {
      if (c === "." && curr === 0) {
        ret += getArrangements(memo, springs, records, si + 1, ri, 0);
      } else if (
        c === "." &&
        curr > 0 &&
        ri < records.length &&
        records[ri] === curr
      ) {
        ret += getArrangements(memo, springs, records, si + 1, ri + 1, 0);
      } else if (c === "#") {
        ret += getArrangements(memo, springs, records, si + 1, ri, curr + 1);
      }
    }
  }
  memo[key] = ret;
  return ret;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let result = 0;
  input.forEach((line) => {
    const memo = {};
    result += getArrangements(memo, line.springs, line.record, 0, 0, 0);
  });

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let result = 0;

  input.forEach((line) => {
    const memo = {};
    const repeatString = Array(5).fill(line.springs).join("?");
    const repeatRecords = [].concat(...Array(5).fill(line.record));
    result += getArrangements(memo, repeatString, repeatRecords, 0, 0, 0);
  });

  return result;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `???.### 1,1,3\n.??..??...?##. 1,1,3`,
        expected: 5,
      },

      {
        input: `???.### 1,1,3\n.??..??...?##. 1,1,3\n?#?#?#?#?#?#?#? 1,3,1,6\n????.#...#... 4,1,1\n????.######..#####. 1,6,5\n?###???????? 3,2,1`,
        expected: 21,
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
        input: `???.### 1,1,3\n.??..??...?##. 1,1,3\n?#?#?#?#?#?#?#? 1,3,1,6\n????.#...#... 4,1,1\n????.######..#####. 1,6,5\n?###???????? 3,2,1`,
        expected: 525152,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

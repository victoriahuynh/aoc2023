import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(" ").map((n) => parseInt(n)));

function getHistory(seq) {
  let allSeqs = [seq];
  const getNextSeq = (seq) => {
    let nextSeq = [];
    for (let i = 1; i < seq.length; i++) {
      nextSeq.push(seq[i] - seq[i - 1]);
    }
    allSeqs.push(nextSeq);
    return nextSeq.every((n) => n === 0) ? allSeqs : getNextSeq(nextSeq);
  };
  getNextSeq(seq);
  return allSeqs.reduce((acc, seq) => acc + seq[seq.length - 1], 0);
}

function getHistory2(seq) {
  let allSeqs = [seq];
  const getNextSeq = (seq) => {
    let nextSeq = [];
    for (let i = 1; i < seq.length; i++) {
      nextSeq.push(seq[i] - seq[i - 1]);
    }
    allSeqs.push(nextSeq);
    return nextSeq.every((n) => n === 0) ? allSeqs : getNextSeq(nextSeq);
  };
  getNextSeq(seq);
  return allSeqs.reverse().reduce((acc, seq) => seq[0] - acc, 0);
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let sum = 0;

  input.forEach((seq) => {
    sum += getHistory(seq);
  });

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let sum = 0;

  input.forEach((seq) => {
    sum += getHistory2(seq);
  });

  return sum;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45`,
        expected: 114,
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
        input: `0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

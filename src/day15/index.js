import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(",");

function hash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const asciiValue = str.charCodeAt(i);
    hash += asciiValue;
    hash *= 17;
    hash %= 256;
  }
  return hash;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let currValue = 0;

  input.forEach((value) => {
    currValue += hash(value);
  });

  return currValue;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const lensMap = new Map();

  input.forEach((value) => {
    const [label, strength] = value.split(value.match(/=|-/));
    const boxHash = hash(label);
    const lensBox = lensMap.get(boxHash) || [];

    if (value.includes("-")) {
      if (lensMap.has(boxHash)) {
        lensMap.set(
          boxHash,
          lensBox.filter((box) => !box.startsWith(label)),
        );
      }
    } else if (value.includes("=")) {
      const existingLens = lensBox.findIndex((box) => box.startsWith(label));
      if (existingLens !== -1) {
        lensBox[existingLens] = `${label} ${strength}`;
      } else {
        lensBox.push(`${label} ${strength}`);
      }
      lensMap.set(boxHash, lensBox);
    }
  });

  let lensTotal = 0;

  for (const [boxHash, lensBox] of lensMap.entries()) {
    if (lensBox.length > 0) {
      lensTotal += lensBox.reduce((prev, curr, i) => {
        return prev + (boxHash + 1) * (i + 1) * parseInt(curr.split(" ")[1]);
      }, 0);
    }
  }

  console.log(lensMap);

  return lensTotal;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: "HASH",
        expected: 52,
      },
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
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
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

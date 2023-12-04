import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

class card {
  constructor(winningNums, myNums, count) {
    this.winningNums = winningNums;
    this.myNums = myNums;
    this.count = count;
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let cards = [];
  let cardValues = 0;

  input.forEach((line) => {
    const cardSplit = line.split(":")[1].split("|");
    const winningCards = cardSplit[0].trim().split(" ").filter((num) => num != "");
    const myCards = cardSplit[1].trim().split(" ").filter((num) => num != "");
    cards.push(new card( winningCards, myCards));
  });

  cards.forEach((card) => {
    let winCount = 0;
    card.myNums.forEach((num) => {
      if (card.winningNums.includes(num)) {
        winCount++;
      }
    });
    if (winCount) {
       cardValues += Math.pow(2, winCount - 1);
    }
  });

  return cardValues;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let cards = [];

  input.forEach((line) => {
    const cardSplit = line.split(":")[1].split("|");
    const winningCards = cardSplit[0].trim().split(" ").filter((num) => num != "");
    const myCards = cardSplit[1].trim().split(" ").filter((num) => num != "");
    cards.push(new card( winningCards, myCards, 1));
  });

  cards.forEach((card, index) => {
    let winCount = 0;
    card.myNums.forEach((num) => {
      if (card.winningNums.includes(num)) {
        winCount++;
      }
    });
    for (let i = 1; i <= winCount; i++) {
      cards[i + index].count += cards[index].count;
    }
  });

  return cards.reduce((sum, card) => {sum += card.count; return sum;}, 0);
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
        {
      input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
expected: 13,
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
      input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
expected: 30,
    },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

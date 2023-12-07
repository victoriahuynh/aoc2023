import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const cardRanking = new Map();
cardRanking.set("2", 0);
cardRanking.set("3", 1);
cardRanking.set("4", 2);
cardRanking.set("5", 3);
cardRanking.set("6", 4);
cardRanking.set("7", 5);
cardRanking.set("8", 6);
cardRanking.set("9", 7);
cardRanking.set("T", 8);
cardRanking.set("J", 9);
cardRanking.set("Q", 10);
cardRanking.set("K", 11);
cardRanking.set("A", 12);

const jokerCardRanking = new Map();
jokerCardRanking.set("J", 0);
jokerCardRanking.set("2", 1);
jokerCardRanking.set("3", 2);
jokerCardRanking.set("4", 3);
jokerCardRanking.set("5", 4);
jokerCardRanking.set("6", 5);
jokerCardRanking.set("7", 6);
jokerCardRanking.set("8", 7);
jokerCardRanking.set("9", 8);
jokerCardRanking.set("T", 9);
jokerCardRanking.set("Q", 10);
jokerCardRanking.set("K", 11);
jokerCardRanking.set("A", 12);

const handRanking = new Map();
handRanking.set("High Card", 0);
handRanking.set("One Pair", 1);
handRanking.set("Two Pairs", 2);
handRanking.set("Three of a Kind", 3);
handRanking.set("Full House", 4);
handRanking.set("Four of a Kind", 5);
handRanking.set("Five of a Kind", 6);

function getHandRanking(hand, hasJokers = false) {
  let cardCountMap = {};
  hand.split("").forEach((c) => (cardCountMap[c] = (cardCountMap[c] || 0) + 1));
  let sortedCardCountMap = Object.entries(cardCountMap).sort((a, b) => {
    if (a[1] == b[1]) {
      return cardRanking.get(a[0]) - cardRanking.get(b[0]);
    }
    return b[1] - a[1];
  });
  console.log(cardCountMap);
  console.log(sortedCardCountMap);
  let hasPair = false;
  let pairCount = 0;
  let hasThree = false;
  let jokerCount = hand.match(/J/g) ? hand.match(/J/g).length : 0;

  for (const [key, value] of sortedCardCountMap) {
    console.log(key);
    let cardVal = value;
    if (hasJokers && key !== "J") {
      cardVal += jokerCount;
    }
    console.log(key + " " + cardVal);
    if (cardVal == 5) {
      return "Five of a Kind";
    }
    if (cardVal == 4) {
      return "Four of a Kind";
    }
    if (cardVal == 3) {
      hasThree = true;
    }
    if (cardVal == 2) {
      hasPair = true;
      pairCount++;
    }
  }

  if (hasThree && hasPair) {
    return "Full House";
  }
  if (hasThree && !hasPair) {
    return "Three of a Kind";
  }
  if (!hasThree && hasPair) {
    if (pairCount == 2) {
      return "Two Pairs";
    }
    return "One Pair";
  }
  return "High Card";
}

function compareHandsAndCards(hand1, hand2, hasJokers = false) {
  let rankingDiff = hand1.handRanking - hand2.handRanking;
  // console.log(hand1, hand2, rankingDiff);
  if (rankingDiff === 0) {
    for (let i = 0; i < hand1.handName.length; i++) {
      let cardDiff = 0;
      if (hasJokers) {
        // console.log(hand1.handName[i], hand2.handName[i]);
        cardDiff =
          jokerCardRanking.get(hand1.handName[i]) -
          jokerCardRanking.get(hand2.handName[i]);
      } else {
        cardDiff =
          cardRanking.get(hand1.handName[i]) -
          cardRanking.get(hand2.handName[i]);
      }
      // console.log(cardDiff);
      if (cardDiff !== 0) {
        return cardDiff;
      }
    }
  }
  return rankingDiff;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let gameHands = [];

  input.forEach((line) => {
    let cards = line.split(" ");
    // console.log(cards);
    let hand = {
      handName: cards[0],
      handRanking: handRanking.get(getHandRanking(cards[0])),
      handBid: cards[1],
    };
    // console.log(getHandRanking(cards[0]));
    // console.log(hand);

    gameHands.push(hand);
  });

  // console.log(gameHands);
  console.log(gameHands.sort(compareHandsAndCards));

  let totalWinnings = 0;

  gameHands.forEach((hand, idx) => {
    // console.log(hand.handBid * (idx + 1));
    totalWinnings += parseInt(hand.handBid) * (idx + 1);
  });

  return totalWinnings;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let gameHands = [];

  input.forEach((line) => {
    let cards = line.split(" ");
    // console.log(cards);
    let hand = {
      handName: cards[0],
      handRanking: handRanking.get(getHandRanking(cards[0], true)),
      handBid: cards[1],
    };
    // console.log(getHandRanking(cards[0]));
    // console.log(hand);

    gameHands.push(hand);
  });

  // console.log(gameHands);
  gameHands = gameHands.sort((a, b) => compareHandsAndCards(a, b, true));

  let totalWinnings = 0;

  gameHands.forEach((hand, idx) => {
    // console.log(hand.handBid * (idx + 1));
    if (hand.handRanking !== 0) {
      console.log(hand.handName + " " + hand.handRanking + " " + (idx + 1));
    }
    totalWinnings += parseInt(hand.handBid) * (idx + 1);
  });

  return totalWinnings;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
      {
        input: `32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483`,
        expected: 6440,
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
        input: `32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483`,
        expected: 5905,
      },
      {
        input: `JJJJJ 992\nJ8888 993\nQQJQQ 994\n7J7J7 995\n5555J 996\nJ888J 997\n2J222 998\n9999J 999\n8JJJJ 1000`,
        expected: 5905,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

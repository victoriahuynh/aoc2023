import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const cardRankings = "23456789TJQKA";
const cardRankingsJoker = "J23456789TQKA";

const handRankings = {
  highCard: 0,
  onePair: 1,
  twoPairs: 2,
  threeOfAkind: 3,
  fullHouse: 4,
  fourOfAKind: 5,
  fiveOfAKind: 6,
};

function getHandRanking(hand, hasJokers = false) {
  if (hasJokers) {
    if (hand.indexOf("J") != -1) {
      let mostFrequent = hand
        .replaceAll("J", "")
        .split("")
        .reduce(
          (acc, card) =>
            hand.replaceAll("J", "").split(card).length - 1 > acc[1]
              ? [card, hand.replaceAll("J", "").split(card).length - 1]
              : acc,
          ["", 0],
        )[0];
      hand = hand.replaceAll("J", mostFrequent || "K");
    }
  }

  let cardCountMap = {};
  hand.split("").forEach((c) => (cardCountMap[c] = (cardCountMap[c] || 0) + 1));
  let hasPair = false;
  let pairCount = 0;
  let hasThree = false;

  for (const [key, value] of Object.entries(cardCountMap)) {
    let cardVal = value;
    if (cardVal == 5) {
      return "fiveOfAKind";
    }
    if (cardVal == 4) {
      return "fourOfAKind";
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
    return "fullHouse";
  }
  if (hasThree && !hasPair) {
    return "threeOfAkind";
  }
  if (!hasThree && hasPair) {
    if (pairCount == 2) {
      return "twoPairs";
    }
    return "onePair";
  }
  return "highCard";
}

function compareHandsAndCards(hand1, hand2, hasJokers = false) {
  let rankingDiff = hand1.handRanking - hand2.handRanking;
  if (rankingDiff === 0) {
    for (let i = 0; i < hand1.handName.length; i++) {
      let cardDiff = 0;
      if (hasJokers) {
        cardDiff =
          cardRankingsJoker.indexOf(hand1.handName[i]) -
          cardRankingsJoker.indexOf(hand2.handName[i]);
      } else {
        cardDiff =
          cardRankings.indexOf(hand1.handName[i]) -
          cardRankings.indexOf(hand2.handName[i]);
      }
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
    let hand = {
      handName: cards[0],
      handRanking: handRankings[getHandRanking(cards[0])],
      handBid: cards[1],
    };
    gameHands.push(hand);
  });

  let totalWinnings = 0;

  gameHands = gameHands.sort((a, b) => compareHandsAndCards(a, b));

  gameHands.forEach((hand, idx) => {
    totalWinnings += parseInt(hand.handBid) * (idx + 1);
  });

  return totalWinnings;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let gameHands = [];

  input.forEach((line) => {
    let cards = line.split(" ");
    let hand = {
      handName: cards[0],
      handRanking: handRankings[getHandRanking(cards[0], true)],
      handBid: cards[1],
    };

    gameHands.push(hand);
  });

  gameHands = gameHands.sort((a, b) => compareHandsAndCards(a, b, true));

  let totalWinnings = 0;

  gameHands.forEach((hand, idx) => {
    if (hand.handRanking !== 0) {
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
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

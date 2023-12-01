import run from "aocrunner";

function isNumber(value) {
  return !isNaN(value);
}

const wordDigitMap = new Map([
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9']
]);

function isWordNumber(line) {
  const array = Array.from(line);
  // console.log(array);
  let wordMatchesMap = new Map();
  let wordMatches = [];
  let matchIndexes = [];
  const wordArray = Array.from(wordDigitMap.keys());
  // console.log(wordArray);
  wordArray.forEach((wordNum) => {
    // console.log(wordNum);
  let left = 0;
  let right = array.length - 1;
  // console.log(left + "" + right);
  while (left <= right) {
    // console.log(left + "" + right);
    let leftMatch = false;
    let rightMatch = false;
    if (array[left] === wordNum.charAt(0)) {
      leftMatch = true;
    }
    if (array[right] === wordNum.charAt(wordNum.length - 1)) {
      rightMatch = true;
    }
    if (leftMatch && rightMatch) {
       //console.log("left:" + left + "right:" + right);
       //console.log("substring:" + line.substring(left, right + 1));
       // console.log(wordNum == line.substring(left, right + 1));
       if (line.substring(left, right + 1) == wordNum) {
        //console.log("WHOOPEE");
        wordMatchesMap.set(wordNum, right);
         // console.log(wordMatches);
       }
       right--;
    
    } else if (leftMatch) {
      right--; 
    } else {
      left++;
      right--;
    }
  }
  });
  // console.log(wordMatchesMap);
  const map1 = new Map([...wordMatchesMap.entries()].sort((a, b) => a[1] - b[1]));
  // console.log(map1);
    return map1;
}

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let calibrationValues = [];

  input.forEach(line => {
    let numArray = [];
    Array.from(line).forEach((char) => {
      if (isNumber(char)) {
        numArray.push(char);
      }
    });
    calibrationValues.push(numArray[0] + numArray[numArray.length - 1]);
  });

  return  calibrationValues.reduce((a, b) => parseInt(a) + parseInt(b), 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
   let calibrationValues = [];

  input.forEach(line => {
    console.log(line);
    let numArray = [];
    while (line.length > 0) {
       console.log(line);
      if (isNumber(line.charAt(0))) {
        numArray.push(line.charAt(0));
        line = line.substring(1);
      } else {
        // console.log("hit");
        const wordNumberMap = isWordNumber(line);
       
        if (wordNumberMap.size > 0) {
          console.log(wordNumberMap);
          Array.from(wordNumberMap.keys()).forEach((word) => {
            numArray.push(wordDigitMap.get(word));
          });
           // console.log(wordNumber[0]);
           const lastNum = Array.from(wordNumberMap.entries()).pop();
           console.log();
          
           // console.log(line.substring(wordNumber[1]));
          line = line.substring(lastNum[1]);
        } else {
          line = line.substring(1);
        }
      }
    }
    console.log(numArray);
    console.log("calibrationValue:" + (numArray[0] + numArray[numArray.length - 1]));
    calibrationValues.push(numArray[0] + numArray[numArray.length - 1]);
  });

  console.log(calibrationValues);
  return  calibrationValues.reduce((a, b) => parseInt(a) + parseInt(b), 0);
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
      //   expected: "",
      // },

      {input: "treb7uchet", expected: 77},
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let engineMatrix = [];
  let partNumbers = 0;
  input.forEach((line) => {
    engineMatrix.push(line.split(""));
  });

  for (let y = 0; y < engineMatrix.length; y++) {
    let currNum, checkingNum, hasSpecial = false;
    for (let x = 0; x < engineMatrix[y].length; x++) {  
      if (engineMatrix[y][x].match(/[0-9]/) && !checkingNum) {
        currNum = "";
        checkingNum = true;
        hasSpecial = false;
      }

      if ((x == engineMatrix[y].length - 1 || !engineMatrix[y][x].match(/[0-9]/)) && checkingNum) {
       if (hasSpecial) {
        // console.log("ADDED " + currNum);
        // console.log("PART NUM " + partNumbers);
          partNumbers += parseInt(currNum + (engineMatrix[y][x].match(/[0-9]/) ? engineMatrix[y][x] : ""));
        }
        checkingNum = false;
      }

      if (checkingNum) {
        currNum += engineMatrix[y][x];
      
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            if (y + i < 0 || y + i >= engineMatrix.length || x + j < 0 || x + j >= engineMatrix[y].length) continue;
            if (!engineMatrix[y + i][x + j].match(/[0-9.]/)) {
              hasSpecial = true;
            }
          }
        }
      }
      }
    }

  return partNumbers;
};


const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let engineMatrix = [];
  let gearNumbers = {};
  input.forEach((line) => {
    engineMatrix.push(line.split(""));
  });

  for (let y = 0; y < engineMatrix.length; y++) {
    let currNum, checkingNum, gearSpot;
    for (let x = 0; x < engineMatrix[y].length; x++) {  
      if (engineMatrix[y][x].match(/[0-9]/) && !checkingNum) {
        currNum = "";
        checkingNum = true;
        gearSpot = null;
      }

      if ((x == engineMatrix[y].length - 1 || !engineMatrix[y][x].match(/[0-9]/)) && checkingNum) {
       if (gearSpot) {
          gearNumbers[gearSpot].push(parseInt(currNum + (engineMatrix[y][x].match(/[0-9]/) ? engineMatrix[y][x] : "")));
        }
        checkingNum = false;
      }

      if (checkingNum) {
        currNum += engineMatrix[y][x];
      
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            if (y + i < 0 || y + i >= engineMatrix.length || x + j < 0 || x + j >= engineMatrix[y].length) continue;
           
            const currChar = engineMatrix[y + i][x + j];
            if (currChar === "*") {
              gearSpot = `${x + j},${y + i}`;
              if (gearNumbers[gearSpot] == null) {
                gearNumbers[gearSpot] = [];
              }
            }
          }
        }
      }
      }
    }

    console.log(gearNumbers);

  return Object.values(gearNumbers).reduce((sum, array) => {
    if (array.length == 2) {
      sum += array[0] * array[1]; 
    }
    return sum;
  }, 0);
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
        "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..\n", 
        expected: 4361,
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
        "467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..\n", 
        expected: 467835,
      }, 
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

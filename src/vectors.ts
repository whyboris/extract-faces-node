const fs = require('fs');

// this file is for experimenting with vector stuff

const rawData = fs.readFileSync('./output/vectors.json');

const data = JSON.parse(rawData);

console.log(getDistance(data[0], data[1]));
console.log(getDistance(data[0], data[2]));
console.log(getDistance(data[1], data[2]));



function getDistance(vector1: number[], vector2: number[]): number {
  let sum = 0;
  for (let i = 0; i < vector1.length; i++) {
    const diff = vector1[i] - vector2[i];
    sum = sum + (diff * diff);
  }
  return sum;
}

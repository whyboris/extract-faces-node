const tf = require('@tensorflow/tfjs-node');

const faceapi = require('face-api.js');

const fs = require('fs');

interface Person {
  vector: number[];
  weight: number; // number of vectors averaged for this person
}

// this file is for experimenting with vector stuff

const rawData1 = fs.readFileSync('./output/vectors.json');
const rawData2 = fs.readFileSync('./output/vectorsX.json');

const data1 = JSON.parse(rawData1);
const data2 = JSON.parse(rawData2);

// const floats = new Float32Array(data1[0]);

// const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors('Test', [floats]);

// const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7);

// const wut = faceMatcher.findBestMatch(data1[1]);

// console.log(wut);

console.log(data1.length);

const avgFace: number[] = getAverage(data1[0], data1[2]);

// console.log('same');
console.log(getDistance(data1[0], data1[1]));
console.log(getDistance(data1[0], data1[2]));
console.log(getDistance(data1[0], data1[3]));
console.log(getDistance(data1[0], data1[4]));
console.log(getDistance(data1[0], data1[5]));
console.log(getDistance(data1[1], data1[2]));
console.log(getDistance(data1[1], data1[3]));
console.log(getDistance(data1[1], data1[4]));
console.log(getDistance(data1[1], data1[5]));
console.log(getDistance(data1[2], data1[3]));
console.log(getDistance(data1[2], data1[4]));
console.log(getDistance(data1[2], data1[5]));
console.log(getDistance(data1[3], data1[4]));
console.log(getDistance(data1[3], data1[5]));
console.log(getDistance(data1[4], data1[5]));

console.log('round2');
// console.log('same');
console.log(getDistance(avgFace, data1[1]));
console.log(getDistance(avgFace, data1[2]));
console.log(getDistance(avgFace, data1[3]));
console.log(getDistance(avgFace, data1[4]));
console.log(getDistance(avgFace, data1[5]));
console.log(getDistance(avgFace, data1[2]));
console.log(getDistance(avgFace, data1[3]));
console.log(getDistance(avgFace, data1[4]));
console.log(getDistance(avgFace, data1[5]));
console.log(getDistance(avgFace, data1[3]));
console.log(getDistance(avgFace, data1[4]));
console.log(getDistance(avgFace, data1[5]));
console.log(getDistance(avgFace, data1[4]));
console.log(getDistance(avgFace, data1[5]));
console.log(getDistance(avgFace, data1[5]));

console.log('round3');

const avg2 = getAverage(data2[0], data2[1]);

console.log(getDistance(avg2, data2[0]));
console.log(getDistance(avg2, data2[1]));
console.log(getDistance(avgFace, avg2));


// console.log('diff 1');
// console.log(getDistance(data2[0], data2[1]));

// console.log('diff 2');
// console.log(getDistance(data1[0], data2[0]));
// console.log(getDistance(data1[0], data2[1]));

/**
 * Get average of two vectors
 * @param vector1
 * @param vector2
 */
function getAverage(vector1: number[], vector2: number[]): number[] {

  const averageVector: number[] = [];

  for (let i = 0; i < vector1.length; i++) {
    const average = (vector1[i] + vector2[i]) / 2;
    averageVector.push(average);
  }

  return averageVector;
}

/**
 * Euclidean distance between two vectors
 * @param vector1
 * @param vector2
 */
function getDistance(vector1: number[], vector2: number[]): number {
  let sum = 0;
  for (let i = 0; i < vector1.length; i++) {
    const diff = vector1[i] - vector2[i];
    sum = sum + (diff * diff);
  }

  if (sum < 0.36) {
    // based on article by creator of Face.js, Vincent Mühler,
    // 0.6 is a good distance threshold value to judge
    // whether the descriptors match or not
    console.log('likely the same person!!!');
  }

  return Math.sqrt(sum);
}

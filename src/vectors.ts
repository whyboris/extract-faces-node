const tf = require('@tensorflow/tfjs-node');

const faceapi = require('face-api.js');

const fs = require('fs');

// this file is for experimenting with vector stuff

const rawData1 = fs.readFileSync('./output/vectors1.json');
const rawData2 = fs.readFileSync('./output/vectors2.json');

const data1 = JSON.parse(rawData1);
const data2 = JSON.parse(rawData2);

const floats = new Float32Array(data1[0]);

const labeledFaceDescriptors = new faceapi.LabeledFaceDescriptors('Test', [floats]);

const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7);

const wut = faceMatcher.findBestMatch(data1[1]);

console.log(wut);

console.log('same');
console.log(getDistance(data1[0], data1[1]));
console.log(getDistance(data1[0], data1[2]));
console.log(getDistance(data1[1], data1[2]));

console.log('diff 1');
console.log(getDistance(data2[0], data2[1]));

console.log('diff 2');
console.log(getDistance(data1[0], data2[0]));
console.log(getDistance(data1[0], data2[1]));



function getDistance(vector1: number[], vector2: number[]): number {
  let sum = 0;
  for (let i = 0; i < vector1.length; i++) {
    const diff = vector1[i] - vector2[i];
    sum = sum + (diff * diff);
  }
  return Math.sqrt(sum);
}

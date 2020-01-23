const tf = require('@tensorflow/tfjs-node');

const canvas = require('canvas');
const faceapi = require('face-api.js');

// @ts-ignore
const { Canvas, Image } = canvas;

faceapi.env.monkeyPatch({ Canvas, Image });

import { InputMeta, FullDetection } from "./interfaces";

/**
 * Load the model only once
 */
export async function loadModel() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('./weights');
  await faceapi.nets.ageGenderNet.loadFromDisk('./weights');
  // await faceapi.nets.faceLandmark68Net.loadFromDisk('./weights');
  // await faceapi.nets.tinyFaceDetector.loadFromDisk('./weights'); // NOT VERY GOOD, but fast
}

/**
 * Use face-api.js to detect a rectangle around the face
 * @param imageWidth
 * @param sizes
 * @param imgBuffer
 */
export async function findTheFaces(imageWidth: number, sizes: InputMeta, imgBuffer: Buffer): Promise<FullDetection[]> {

  const imgElement = new Image();

  imgElement.width = imageWidth;
  imgElement.height = sizes.height;
  imgElement.src = imgBuffer;

  // const detections = await faceapi.detectAllFaces(imgElement);
  // const detections = await faceapi.detectAllFaces(imgElement, new faceapi.TinyFaceDetectorOptions());
  const detections = await faceapi.detectAllFaces(imgElement).withAgeAndGender(); // changes output format a bit

  // console.log(detections);

  return detections;
}
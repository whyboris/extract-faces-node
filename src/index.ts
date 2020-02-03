import { runEverything } from "./pipeline";

const RELATIVE_IMAGE_PATH = './images2/input.jpg';
const CURRENT_NUMBER_OF_SCREENS = 9;  // the number of chunks the image is split into (20 screenshots for example) // HARDCODED FOR NOW
const OUTPUT_FILE_NAME_LARGEST = './output/largest.jpg';
const OUTPUT_FILE_NAME_STRIP = './output/facestrip.jpg';
const GENDER = 'female';
const MIN_FACE_HEIGHT = 50;

runEverything(
  RELATIVE_IMAGE_PATH,
  CURRENT_NUMBER_OF_SCREENS,
  OUTPUT_FILE_NAME_LARGEST,
  OUTPUT_FILE_NAME_STRIP,
  GENDER,
  MIN_FACE_HEIGHT
);

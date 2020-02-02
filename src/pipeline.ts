require('pretty-error').start();

import { loadModel, findTheFaces } from './detect';
import { getImageSizes, getSubImageBuffer, getCroppedImageBuffers, saveFinalOutput } from './sharp';
import { InputMeta, FullDetection, Gender, BufferAndHeight } from './interfaces';
import { filterFaces } from './support';

// VARIABLES for now ===============================================================================

const RELATIVE_IMAGE_PATH = './images2/img2.jpg';
const CURRENT_NUMBER_OF_SCREENS = 20;  // the number of chunks the image is split into (20 screenshots for example) // HARDCODED FOR NOW
const OUTPUT_FILE_NAME_LARGEST = './output/largest.jpg';
const OUTPUT_FILE_NAME_STRIP = './output/facestrip.jpg';
const GENDER = 'female';
const MIN_FACE_HEIGHT = 100;

runEverything(RELATIVE_IMAGE_PATH, CURRENT_NUMBER_OF_SCREENS, OUTPUT_FILE_NAME_LARGEST, OUTPUT_FILE_NAME_STRIP, GENDER, MIN_FACE_HEIGHT);

// ==== PIPELINE ===================================================================================

/**
 * Full pipeline process
 * @param inputFile  - relative path to INPUT image
 * @param numOfScreens - the number of screenshots in the filmstrip
 * @param outputFile1 - relative path to LARGEST face image
 * @param outputFile2 - relative path to FACE STRIP image
 * @param gender
 * @param minHeight
 */
async function runEverything(
  inputFile: string,
  numOfScreens: number,
  outputFile1: string,
  outputFile2: string,
  gender: Gender,
  minHeight: number
) {

  await loadModel();

  const sizes: InputMeta = await getImageSizes(inputFile, numOfScreens);

  console.log(sizes);

  let all_faces: BufferAndHeight[] = [];

  for (let i = 0; i < sizes.width; i = i + sizes.eachSSwidth) {

    const imgBuffer: Buffer = await getSubImageBuffer(i, sizes.eachSSwidth, sizes, inputFile);

    const allDetections: FullDetection[] = await findTheFaces(imgBuffer);

    const filteredDetections: FullDetection[] = filterFaces(allDetections, gender, minHeight);

    // warning -- getCroppedImageBuffers returns an array (possibly empty)
    // so use `...` spread operator - it will not add any elements if incoming array is empty
    all_faces.push(...(await getCroppedImageBuffers(filteredDetections, imgBuffer, sizes)));

  }

  if (all_faces.length) {

    const largestFace = all_faces.reduce((a, b) => {
      return a.height > b.height ? a : b;
    });

    saveFinalOutput([largestFace], outputFile1, sizes);
    console.log('Largest:', outputFile1);

    saveFinalOutput(all_faces, outputFile2, sizes);
    console.log('Facestrip:', outputFile2);

  } else {
    console.log('no faces found!');
  }
}

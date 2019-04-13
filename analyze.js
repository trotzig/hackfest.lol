const vision = require('@google-cloud/vision');
const path = require('path');

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
  __dirname,
  'googleCredentials.json',
);

module.exports = async function analyze() {
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection('./snapshot.jpg');
  return result;
};

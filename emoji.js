const fs = require('fs');
const path = require('path');

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(
  __dirname,
  'googleCredentials.json',
);

const crypto = require('crypto');
const randomFromArray = require('./randomFromArray');
const vision = require('@google-cloud/vision');

const emojis = {
  smiling: ['🙂', '😊', '😆'],
  notSmiling: ['😦', '🤧', '😯'],
};
function createHash(data) {
  return crypto
    .createHash('md5')
    .update(data)
    .digest('hex');
}
async function run() {
  console.log(randomFromArray(emojis.smiling));

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.labelDetection('./snapshot.jpg');
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
}
run().catch(e => console.error(e));

// open chrome full screen // /usr/bin/osascript -e "tell application \"Google Chrome\"" -e "activate" -e "make new window" -e "tell application \"System Events\"" -e "keystroke \"f\" using {control down, command down}" -e "end tell" -e "end tell"

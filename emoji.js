const fs = require('fs');

const crypto = require('crypto');
const randomFromArray = require('./randomFromArray');

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

  //const detector = new SmileFaceDetector(); //const image = await detector.load('snapshot.jpg'); //console.log(image);
}
run(); // open chrome full screen // /usr/bin/osascript -e "tell application \"Google Chrome\"" -e "activate" -e "make new window" -e "tell application \"System Events\"" -e "keystroke \"f\" using {control down, command down}" -e "end tell" -e "end tell"

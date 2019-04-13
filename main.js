const analyze = require('./analyze');
const emoji = require('./emoji');
const createHTML = require('./createHTML');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function run() {
  await exec('imagesnap -w 1.00');
  const props = await analyze();
  const emojis = await emoji(props.labelAnnotations);
  await createHTML({ emojis });
  console.log(emojis);
  //await exec('/usr/bin/osascript -e "tell application \"Google Chrome\"" -e "activate" -e "make new window" -e "tell application \"System Events\"" -e "keystroke \"f\" using {control down, command down}" -e "end tell" -e "end tell"');
  await exec('open index.html');
  console.log('after');
}

run().catch(e => console.error(e));

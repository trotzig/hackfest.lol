const util = require('util');

const analyze = require('./analyze');
const createHTML = require('./createHTML');
const emoji = require('./emoji');
const randomFromArray = require('./randomFromArray');

const exec = util.promisify(require('child_process').exec);

const auras = [
  'radial-gradient(transparent, #00dcff6b, #720080)',
  'radial-gradient(transparent, #ff00d46b, #00807a)',
  'radial-gradient(transparent, #62ff006b, #daca06)',
  'radial-gradient(transparent, #ff00006b, #1d06da)',
];

async function run() {
  await exec('imagesnap -w 1.00');

  const props = await analyze();
  const emojis = await emoji(props.labelAnnotations);
  const { stdout: animal } = await exec(
    'ls spirit-animals | sort -R | tail -$N | head -1',
  );
  // const { red, green, blue } = props.imagePropertiesAnnotation.dominantColors.colors[0].color;

  const auraGradient = randomFromArray(auras);
  await createHTML({ emojis, animal, auraGradient });
  console.log(emojis);
  //await exec('/usr/bin/osascript -e "tell application \"Google Chrome\"" -e "activate" -e "make new window" -e "tell application \"System Events\"" -e "keystroke \"f\" using {control down, command down}" -e "end tell" -e "end tell"');
  await exec('open index.html');
  console.log('after');
}

run().catch(e => console.error(e));

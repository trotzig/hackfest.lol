const util = require('util');

const analyze = require('./analyze');
const createHTML = require('./createHTML');
const emoji = require('./emoji');
const randomFromArray = require('./randomFromArray');

const exec = util.promisify(require('child_process').exec);

const auras = [
  {
    gradient: 'radial-gradient(transparent, #00dcff6b, #720080)',
    text: `
      You are energetic, enthusiastic, adventurous, and temperamental. You are
      most likely also strong, competitive, and good at sports.
    `,
  },
  {
    gradient: 'radial-gradient(transparent, #ff00d46b, #00807a)',
    text: `
     You are intelligent, analytical, inventive, logical, overly critical of
     yourself and others, eccentric, and motivated, but might become a workaholic.
    `,
  },
  {
    gradient: 'radial-gradient(transparent, #62ff006b, #daca06)',
    text: `
      You have great communicators with the tendency to be intuitive, eloquent,
      charismatic, intelligent, organized, and inspirational. You might want a
      balance of your head and heart to make tough decisions, and tend to help
      alleviate anger in others and are peacemakers.
    `,
  },
  {
    gradient: 'radial-gradient(transparent, #ff00006b, #1d06da)',
    text: `
      You are associated with discouragement, confusion, and a lack of confidence in
      yourself, the situation, or others. You are also deceptive and selfish.
    `,
  },
];

async function run() {
  await exec('open countdown.html');
  await exec('say "Hey kompees! Yag air orahklet under brewn. Wah moody doo air\!  Kohla new in ee kawmehrawn\! "');

  await exec('open progress.html');
  await exec('imagesnap -w 1.00');

  const props = await analyze();
  const emojis = await emoji(props.labelAnnotations);
  const { stdout: animal } = await exec(
    'ls spirit-animals | sort -R | head -1',
  );
  // const { red, green, blue } = props.imagePropertiesAnnotation.dominantColors.colors[0].color;

  const { gradient: auraGradient, text: auraText } = randomFromArray(auras);
  await createHTML({ emojis, animal, auraGradient, auraText });
  console.log(emojis);
  //await exec('/usr/bin/osascript -e "tell application \"Google Chrome\"" -e "activate" -e "make new window" -e "tell application \"System Events\"" -e "keystroke \"f\" using {control down, command down}" -e "end tell" -e "end tell"');
  await exec('open index.html');
 
  if(props.labelAnnotations.some((label) => label.description === 'Glasses' )){
    await exec(`say "snygga glahsehgon\!"`);
  }

  if(props.labelAnnotations.some((label) => label.description === 'Hat' )){
    await exec(`say "snygga hat\!"`);
  }



  await exec('say "Yag hawr photographerat deen aura, den air bombastic"');

  await exec('say "din framteed ser... well... ehrm... intressant ewt\! Hair air deen eeh awla fawll"');

  await exec(`say ${emojis.join(' ')}`);

  await exec(`say "Din spirit animal air en ${animal}\!"`);

  await exec('say "Tuck fur may, toodles"');

  console.log('after');
}

//run().catch(e => console.error(e));

module.exports = run;

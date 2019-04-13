const axios = require('axios');

const randomFromArray = require('./randomFromArray');

const additional = [
  '💩',
  '🥦',
  '🦕',
  '💉',
  '🚑',
  '💘',
  '💻',
  '🌈',
  '🏂',
  '🌋',
  '👻',
  '👁',
  '💍',
  '🐣',
  '👮',
];
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function run(labels) {
  const descs = labels.map(label => label.description);

  const allTokens = [];
  descs.forEach(desc => allTokens.push(...desc.toLowerCase().split(' ')));
  const ignoredTokens = ['head', 'light'];
  const tokens = allTokens.filter(t => !ignoredTokens.includes(t));

  const all = await Promise.all(
    tokens.map(async token => {
      const res = await axios.get(
        `https://www.emojidex.com/api/v1/search/emoji?code_cont=${encodeURIComponent(
          token,
        )}`,
      );
      if (res.data.emoji.length) {
        const emoji = res.data.emoji.find(({ moji }) => moji !== null);
        if (emoji) {
          console.log(token, emoji.moji);
          return emoji.moji;
        }
      }
    }),
  );
  const filtered = all.filter(Boolean);

  const set = new Set(filtered);

  while (set.size < 12) {
    set.add(randomFromArray(additional));
  }

  const ret = Array.from(set);
  console.log(ret, typeof ret);
  shuffle(ret);
  return ret;
}
module.exports = run;

// open chrome full screen // /usr/bin/osascript -e "tell application \"Google Chrome\"" -e "activate" -e "make new window" -e "tell application \"System Events\"" -e "keystroke \"f\" using {control down, command down}" -e "end tell" -e "end tell"

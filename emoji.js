const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function run(labels) {
  const descs = labels.map(label => label.description);

  const tokens = [];
  descs.forEach(desc => tokens.push(...desc.toLowerCase().split(' ')));
  console.log(tokens);

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
          console.log(token, emoji.moji.length)
          return emoji.moji;
        }
      }
    }),
  );
  const filtered = all.filter(Boolean);
  return Array.from(new Set(filtered));
}
module.exports = run;

// open chrome full screen // /usr/bin/osascript -e "tell application \"Google Chrome\"" -e "activate" -e "make new window" -e "tell application \"System Events\"" -e "keystroke \"f\" using {control down, command down}" -e "end tell" -e "end tell"

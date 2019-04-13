const fs = require('fs');

module.exports = function createHTML({ emojis }) {
  const html = `
    <html>
      <style type="text/css">
        .emojis {
          font-size: 100px;
        }
      </style>
      <body>
        <div class="emojis">
          ${emojis.join(' ')}
        </div>
      </body>
    </html>
  `;

  fs.writeFileSync('index.html', html, 'utf-8');
}

const fs = require('fs');

module.exports = function createHTML({ emojis }) {
  const html = `
    <html>
      <style type="text/css">
        .emojis {
          font-size: 100px;
          text-align: center;
        }
        .image img {
          max-height: 400px;
        }
      </style>
      <body>
        <div class="emojis">
          ${emojis.join(' ')}
        </div>
        <div class="image">
          <img src="snapshot.jpg">
        </div>
      </body>
    </html>
  `;

  fs.writeFileSync('index.html', html, 'utf-8');
}

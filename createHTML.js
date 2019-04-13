const fs = require('fs');

module.exports = function createHTML({ emojis, animal, auraGradient, backgroundColor }) {
  const html = `
    <html>
      <style type="text/css">
        body {
          text-align: center;
        }
        .layout {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;
          column-gap: 30px;
        }
        .emojis {
          font-size: 100px;
        }
        .spirit-animal {
          height: 200px;
        }
        .image {
          position: relative;
          display: inline-block;
        }
        .aura {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${auraGradient};
        }
        .image img {
          max-height: 400px;
        }
      </style>
      <body>
        <h1>Oraklet under bron</h1>

        <div class="layout">
        <div>
          <h2>Dina spirit-emojis</h2>
          <div class="emojis">
            ${emojis.join(' ')}
          </div>
        </div>

        <div>
          <h2>Aura</h2>
          <div class="image">
            <img src="snapshot.jpg">
            <div class="aura"></div>
          </div>
        </div>

        <div>
          <h2>Ditt spirit-animal: ${animal}</h2>
          <img class="spirit-animal" src="spirit-animals/${animal}">
          <p>${animal}</p>
        </div>
      </body>
    </html>
  `;

  fs.writeFileSync('index.html', html, 'utf-8');
}

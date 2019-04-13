const fs = require('fs');

module.exports = function createHTML({ emojis, animal, auraGradient, backgroundColor }) {
  const html = `
    <html>
      <style type="text/css">
        body {
          text-align: center;
          background-image: url(snapshot.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          color: #ffffff;
          font-family: papyrus;
          font-size: 30px;
          line-height: 1.2;
          padding: 30px;
        }
        .aura {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${auraGradient};
        }

        .emojis-wrapper, .spirit-animal-wrapper {
          position: relative;
        }

        .emojis {
          font-size: 70px;
        }
        .spirit-animal-wrapper {
          position: absolute;
          right: 20px;
          bottom: 20px;
        }
        .spirit-animal {
          height: 200px;
        }
        .image {
          position: relative;
          display: inline-block;
        }
        .image img {
          max-height: 400px;
        }
      </style>
      <body>
        <div class="aura"></div>
        <div class="emojis-wrapper">
          <h2>Dina spirit-emojis</h2>
          <div class="emojis">
            ${emojis.join(' ')}
          </div>
        </div>

        <div class="spirit-animal-wrapper">
          <h2>Ditt spirit-animal:<br> ${animal}</h2>
          <img class="spirit-animal" src="spirit-animals/${animal}">
        </div>
      </body>
    </html>
  `;

  fs.writeFileSync('index.html', html, 'utf-8');
}

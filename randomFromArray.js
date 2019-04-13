module.exports = function randomFromArray(items) {
  return items[Math.floor(Math.random() * items.length)];
};

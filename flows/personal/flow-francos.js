const { addKeyword } = require("@bot-whatsapp/bot");

const flowFrancos = addKeyword("1", { sensitive: true })
  .addAnswer(
    `Tienes ${Math.floor(Math.random() * 120 + 1)} francos`
  )

module.exports = { flowFrancos };

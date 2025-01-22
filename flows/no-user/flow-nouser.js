const { addKeyword } = require("@bot-whatsapp/bot");
const { flowNoUsers_energia } = require("./flow-nouser-energia");
const { flowNoUsers_telecomunicaciones } = require("./flow-nouser-telecomunicaciones");

const flowNoUsers = addKeyword("no")
  .addAnswer(
    [
      "¿Con qué puedo ayudarte?",
      "💡 Ingrese 1. Si su consulta es por servicio de energia",
      "📺 Ingrese 2. Si su consulta es por servicio de telecomunicaciones",
    ],
    { capture: true },
    async (ctx, { fallBack }) => {
      const opcion = ctx.body.toLowerCase();
      if (!["1", "2"].includes(opcion)) {
        return fallBack();
      }
    }, [flowNoUsers_energia, flowNoUsers_telecomunicaciones]
  )

module.exports = { flowNoUsers };

const { addKeyword } = require("@bot-whatsapp/bot");
const { flowFrancos } = require("./flow-francos");

const flowPersonal = addKeyword("soy empleado")
  .addAnswer(
    [
      "👋 BIENVENIDO",
      "👷 Ingrese su número de empleado"
    ],
    { capture: true },
    async (ctx, { fallBack }) => {
      const opcion = ctx.body.toLowerCase();
      if (!["1", "2"].includes(opcion)) {
        return fallBack();
      }
    }, [flowFrancos]
  )

module.exports = { flowPersonal };

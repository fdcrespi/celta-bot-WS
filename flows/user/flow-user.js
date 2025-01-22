const { addKeyword } = require("@bot-whatsapp/bot");
const { flowSumin } = require("./flow-sumin");
const { flowDoc } = require("./flow-doc");

const flowUsers = addKeyword(["si"])
  .addAnswer(
    [
      "👉 Ingrese *1* para consultar sus familiares",
      "👉 Ingrese *2* para consultas relacionadas a su suministro",
    ],
    { capture: true },
    (ctx, { fallBack }) => {
      if (!["1", "2", "3", "hola"].includes((ctx.body).toLowerCase()))
        return fallBack();
      return
    }, [flowSumin, flowDoc]
  )

module.exports = { flowUsers };



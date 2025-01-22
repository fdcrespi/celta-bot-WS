const { addKeyword } = require("@bot-whatsapp/bot");
const { flowNoUsers } = require("./no-user/flow-nouser");
const { flowUsers } = require("./user/flow-user");
const { EVENTS } = require('@bot-whatsapp/bot');
const { flowSumin } = require("./user/flow-sumin");
const { flowDoc } = require("./user/flow-doc");

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAnswer(
    [
      "🙌 Hola. Estoy aquí para ayudarte",
      "¿Sos asociada/o?",
      "👉 *SI* para consultas relacionadas al cliente",
      "👉 *NO* para consultas generales",
    ],
    { capture: true },
    async (ctx, { fallBack }) => {
      const opcion = ctx.body.toLowerCase();
      if (!["si", "no"].includes(opcion)) {
        return fallBack();
      }
      return
    }, [flowUsers, flowNoUsers, flowSumin, flowDoc]
  )

module.exports = { flowPrincipal };

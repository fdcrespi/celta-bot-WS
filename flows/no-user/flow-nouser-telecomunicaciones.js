const { addKeyword, addAnswer } = require("@bot-whatsapp/bot");
const { flowNoUsers } = require("./flow-nouser");

const flowPlanes = addKeyword("1")
.addAnswer(
["- 20 MB - $17.050/mes",
"- 50 MB - $18.300/mes",
"- 100 MB - $21.010/mes",
"- 300 MB - $23.150/mes",
"- 500 MB - $26.550/mes"]
)
.addAnswer("Ingrese *HOLA* para volver a comenzar")

const flowRequisitos = addKeyword("2", { sensitive: true })
.addAnswer(
["- fotocopia de DNI",
"- fotocopia de Contrato de alquiler / Escritura",
"- Garantia"]
)
.addAnswer("Ingrese *HOLA* para volver a comenzar")

const flowNoUsers_telecomunicaciones = addKeyword("2")
  .addAnswer(
    [
      "¿Con qué puedo ayudarte?",
      "💡 Ingrese 1. Para conocer nuestros planes",
      "💡 Ingrese 2. Para conocer los requisitos de conexion",
    ],
    {capture: true},
    async (ctx, { fallBack }) => {
      const opcion = ctx.body.toLowerCase();
      if (!["1", "2"].includes(opcion)) return fallBack();
      /* switch (opcion) {
        case "1":
          return await flowDynamic([
            
          ])
        case "2":
          return await flowDynamic("flow")
        case "3":
          return gotoFlow(flowNoUsers);
        default:
          return fallBack();
      } */
    }, [flowPlanes, flowRequisitos]
  )
 

module.exports = { flowNoUsers_telecomunicaciones };

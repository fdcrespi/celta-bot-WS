const { addKeyword } = require("@bot-whatsapp/bot");
const axios = require("axios");
const { flowTitularidad } = require("../no-user/flow-nouser-energia");

let numbersum;

const suministro = async (suministro) => {
  const config = {
    method: "GET",
    url: `http://200.45.235.121:3000/suministro/${suministro}`,
  };
  try {
    const data = await axios(config).then((response) => response.data);
    return data.map((sumin) => ({
      body: [`Nombre: ${sumin.razon_social}`, `Domicilio: ${sumin.domicilio}`],
    }));
  } catch (err) {
    return null;
  }
};

const flowFacts = addKeyword("1", { sensitive: true })
.addAnswer("En el siguiente link podra ver y pagar sus facturas", null, async (ctx, {state, flowDynamic}) => {
  return await flowDynamic(`https://cajeroenlinea.celtatsas.com.ar/suministro/${state.get("suministro")}`)
})
.addAnswer(["Ingrese *HOLA* para volver a comenzar"])

const flowReclamo = addKeyword("3", { sensitive: true })
.addAnswer("Ingrese un resumen de su reclamo", { capture:true } ,async (ctx, {state, flowDynamic}) => {
  if (ctx.body) {
    return await flowDynamic([
      "Su reclamo ha sido guardado con exito. Muchas gracias.",
      "Ingrese *HOLA* para volver a comenzar"
    ]);
  }
})
.addAnswer([
  "Su reclamo ha sido guardado con exito. Muchas gracias.",
  "Ingrese *HOLA* para volver a comenzar"
])

const flowArtefactos = addKeyword("4", { sensitive: true })
.addAnswer([
  "El plazo para la presentación es de tres (3) días hábiles a partir de la fecha del hecho que ocasiono el daño. Presentando:", 
  "- Dos (2) fotocopia de la última factura de energía vencida, la cual deberá estar abonada.",
  "- Original y fotocopia de exposición civil la cual se extiende en dependencias de la municipalidad ubicada en calle 1810 Nº 469 de Ts. As. detallando la fecha del siniestro, hora del mismo y características de los elementos dañados."
])


const flowSumin = addKeyword("2", { sensitive: true })
  .addAnswer(
    "Por favor ingrese su numero de suministro",
    { capture: true },
    async (ctx, { fallBack, state }) => {
      const data = await suministro(ctx.body)
      if (!data) return fallBack()
      //await flowDynamic(data[0].body);
      await state.update({ datos: data[0].body }) 
      await state.update({ suministro: ctx.body })   
      /* return gotoFlow(flowOptionsSumin) */
      return
    }
  )
  .addAnswer('Sus datos son:', null, async(ctx, {state, flowDynamic}) => {
    console.log(state.get("datos"));
    return await flowDynamic(state.get("datos"))
  })
  .addAnswer(
    [
      "¿Con que puedo ayudarte?",
      "👉 Ingrese 1. Si desea consultar sus facturas y pagarlas",
      "👉 Ingrese 2. Requisitos cambio titularidad",
      "👉 Ingrese 3. Si desea realizar un reclamo",
      "👉 Ingrese 4. Por daños de artefactos",
      "👉 Ingrese *HOLA* para volver a empezar"
    ],
    { capture: true },
    async (ctx, { fallBack }) => {
      if (!["1", "2", "3", "hola"].includes((ctx.body).toLowerCase()))
        return fallBack();
      return
    }, [flowFacts, flowReclamo, flowTitularidad, flowArtefactos]
  )


module.exports = { flowSumin };

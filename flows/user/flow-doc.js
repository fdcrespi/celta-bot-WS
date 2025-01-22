const { addKeyword, addAnswer } = require("@bot-whatsapp/bot");
const axios = require("axios");

const flowFamiliares = addKeyword('LISTADO_DE_FAMILIARES_DOCUMENTO')
.addAnswer('Listado de familiares');

const familiares = async (documento) => {
  const config = {
    method: "GET",
    url: `http://200.45.235.121:3000/familiares/${documento}`,
  }
  try {
    const data = await axios(config).then((response) => response.data)
    return [
      {
        body: data.map((f) => `
        Nombre: ${f.nombre}
        Apellido: ${f.apellido}
        Documento: ${f.nro_doc_fam}
        Parentezco: ${f.descripcion}
        `).join("\n"), // Une los mensajes con doble salto de línea
      },
    ];
  } catch (error) {
    return null;
  }
}

const flowDoc = addKeyword("1", { sensitive: true })
  .addAnswer(
    "Por favor ingrese su numero de documento",
    { capture: true },
    async (ctx, { fallBack, state }) => {
      const doc = ctx.body
      if (!doc) return fallBack()
      //await flowDynamic(data[0].body);
      const fam = await familiares(doc)
      await state.update({ familiares: fam ? fam[0].body : "No existen familiares asociados" })
      await state.update({ documento: ctx.body })
      return
    }
  )
  .addAnswer("Listado de familiares:", null, async(ctx, {state, flowDynamic}) => {
    return await flowDynamic(state.get("familiares"));     
  })
  .addAnswer(["En caso de que existan datos incorrectos, comuniquese con el numero 2983500324", "Ingrese *HOLA* para volver a comenzar"]);
  

module.exports = { flowDoc };
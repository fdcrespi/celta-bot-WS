const { addKeyword } = require("@bot-whatsapp/bot");

const flowConexion = addKeyword("1")
.addAnswer([
  "Requisitos nueva conexion"
])
.addAnswer(`
  No propietarios:
   - Fotocopia del Contrato de Alquiler.
   - Autorización del dueño del inmueble con fotocopia de escritura y DNI.
   - Socio Garante Propietario que sea Titular de una Conexión en esta ciudad y Fotocopia de escritura que acredite la misma y fotocopia del DNI.
  `
)
.addAnswer(`
  Propietarios:
   - Autorización Eléctrica Municipal
   - Fotocopia de DNI del titular de la conexión (en caso de adherirse a otros servicios necesitará fotocopias de los DNI del grupo familiar).
   - Fotocopia de Escritura de Propiedad o Boleto de Compra-Venta.`)
.addAnswer("Ingrese *HOLA* para volver a comenzar")

const flowTitularidad = addKeyword("2")
.addAnswer("Requisitos cambio de titularidad")
.addAnswer("Ingrese *HOLA* para volver a comenzar")

const flowNoUsers_energia = addKeyword("1", { sensitive: true })
  .addAnswer(
    [
      "¿Con qué puedo ayudarte?",
      "💡 Ingrese 1. Requisitos para nueva conexión",
      "💡 Ingrese 2. Requisitos cambio titularidad"
    ],
    { capture: true },
    async (ctx, { fallBack }) => {
      const opcion = ctx.body.toLowerCase();
      if (!["1", "2"].includes(opcion)) {
        return fallBack()
      }
    }, [flowConexion, flowTitularidad]
  )
  

module.exports = { flowNoUsers_energia, flowTitularidad };

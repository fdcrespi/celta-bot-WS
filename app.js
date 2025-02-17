const {
  createBot,
  createProvider,
  createFlow,
} = require("@bot-whatsapp/bot");

require('dotenv').config();

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MySQLAdapter = require("@bot-whatsapp/database/mysql");

/* Import Flows
 * Se definen todos los flows en archivos aparte para una mejor organizacion
 */
const { flowPrincipal } = require("./flows/flow-principal");

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = process.env.NEXT_PUBLIC_MYSQL_HOST;
const MYSQL_DB_USER = process.env.NEXT_PUBLIC_MYSQL_USER;
const MYSQL_DB_PASS = process.env.NEXT_PUBLIC_MYSQL_PASS;
const MYSQL_DB_NAME = process.env.NEXT_PUBLIC_MYSQL_DDBB;
const MYSQL_DB_PORT = process.env.NEXT_PUBLIC_MYSQL_PORT;

const main = async () => {
  const adapterDB = new MySQLAdapter({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASS,
    port: MYSQL_DB_PORT,
  });
  const adapterFlow = createFlow([flowPrincipal]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();

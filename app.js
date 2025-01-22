const {
  createBot,
  createProvider,
  createFlow,
} = require("@bot-whatsapp/bot");

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
const MYSQL_DB_HOST = "192.168.0.17";
const MYSQL_DB_USER = "crespif";
const MYSQL_DB_PASSWORD = "C3lt4";
const MYSQL_DB_NAME = "bot";
const MYSQL_DB_PORT = "3306";

const main = async () => {
  const adapterDB = new MySQLAdapter({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
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

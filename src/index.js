import express from 'express';
import db from "./models/index.js";
import routerApi from './routes/index.js';
import config from './config/config.js';
import cors from 'cors';
const app = express();
const port = config.port;
app.use(express.json());

app.use(
  config.isProd
    ? cors({
        methods: 'GET, PATCH, POST, DELETE',
        origin: '*',
        optionsSuccessStatus: 200,
        credentials: true,
      })
    : cors({}),
);

//app.use(logRequest);

routerApi(app);

// Sincronizar base de datos
db.sequelize.sync().then(() => {
  console.log("Base de datos sincronizada");
}).catch(err => {
  console.error("Error al sincronizar la base de datos:", err);
});

if (config.isProd) {
  
}

app.listen(port, () => {
  console.log('Server running in port', port);
});
import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import {conectionDB} from "./db/db.js"
import rutaUsers from "./views/users/rutas.js";
import rutaProducts from "./views/products/rutas.js";
import rutaSales from "./views/sales/rutas.js";

dotenv.config({path: './.env'});
const app = Express();
app.use(Express.json());
app.use(Cors());
app.use(rutaUsers);
app.use(rutaProducts);
app.use(rutaSales);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Escuchando al puerto: ${process.env.PORT}`);
  });
};

conectionDB(main());

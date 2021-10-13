import Express from "express";
import dotenv from 'dotenv';
import Cors from "cors";
import {conectionDB} from "./db/db.js"
import rutaUsers from "./views/users/rutas.js";

dotenv.config({path: './.env'});
const app = Express();
app.use(Express.json());
app.use(Cors());
app.use(rutaUsers);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Escuchando al puerto: ${process.env.PORT}`);
  });
};

conectionDB(main());

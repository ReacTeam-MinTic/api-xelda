import Express from "express";
import Cors from 'cors';
import dotenv from 'dotenv';
import {conectionDB} from "./db/db.js"
import rutaUsers from "./views/users/rutas.js";
import rutaProducts from "./views/products/rutas.js";
import rutaSales from "./views/sales/rutas.js";
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

dotenv.config({path: './.env'});
const app = Express();
app.use(Express.json());
app.use(Cors());

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://xelda.us.auth0.com/.well-known/jwks.json'
}),
audience: 'api-autenticacion-xelda',
issuer: 'https://xelda.us.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(rutaUsers);
app.use(rutaProducts);
app.use(rutaSales);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Escuchando al puerto: ${process.env.PORT}`);
  });
};

conectionDB(main());

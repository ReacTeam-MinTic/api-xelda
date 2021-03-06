import { getDB } from "../db/db.js";
import jwt_decode from "jwt-decode";

const authorizationStatusUser = async (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const user_token = jwt_decode(token)["https://secret-refuge-48972.herokuapp.com/userData"];
  const conexion = getDB();
  await conexion
    .collection("users")
    .findOne({ email: user_token.email }, async (err, response) => {
      if (response) {
        if (response.status === "Rechazado") {
          res.sendStatus(401);
          res.end();
        } else {
          next();
        }
      }else{
        next();
      };
    });
};

export default authorizationStatusUser;

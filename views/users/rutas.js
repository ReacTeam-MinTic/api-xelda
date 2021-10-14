import Express from "express";
import { getDB } from "../../db/db.js";
import {queryAllUsers, createUsers, editUsers } from "../../controller/users/controller.js";

const rutaUsers = Express.Router();
const genericCallBack = (res) => (err, result) => {
  if (err) {
    console.log(err);
    res.sendStatus(500).send("Error consultando usuarios");
  } else {
    res.json(result);
  }
};

rutaUsers.route("/users").get((req, res) => {
  console.log(
    "Esta es la función que se ejecuta cuando se llama a la ruta /users"
  );
  queryAllUsers(genericCallBack(res));
});

rutaUsers.route("/usuario/nuevo").post((req, res) => {
  createUsers(req.body, genericCallBack(res));
});

rutaUsers.route("/editar/usuarios").patch((req, res) => {
  editUsers(res.body, genericCallBack());
});

rutaUsers.route("/eliminar/usuarios").delete((req, res) => {
  const filterUser = { _id: new ObjectId(req.body._id) };
  const conexion = getDB();
  conexion.collection("users").deleteOne(filterUser, (err, result) => {
    if (err) {
      console.error("Error al eliminar el usuasio", err);
      res.sendStatus(500);
    } else {
      console.log("Eliminación exitosa");
      res.sendStatus(200);
    }
  });
});

export default rutaUsers;

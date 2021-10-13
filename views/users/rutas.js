import Express from "express";
import { getDB } from "../../db/db.js";
import ObjectId from "mongodb";
import {queryAllUsers, createUsers } from "../../controller/users/controller.js";

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
  const edit = req.body;
  const filterUser = { _id: new ObjectId(edit.id) };
  delete edit.id;
  const operation = {
    $set: edit,
  };
  const conexion = getDB();
  conexion
    .collection("users")
    .findOneAndUpdate(
      filterUser,
      operation,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error("Error al actualizar el usuario", err);
          res.sendStatus(500);
        } else {
          console.log("Actualización exitosa");
          res.sendStatus(200);
        }
      }
    );
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

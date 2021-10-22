import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";
import jwt_decode from "jwt-decode";

//MÓDULO DE USUARIOS
const queryAllUsers = async (callback) => {
  const conexion = getDB();
  await conexion.collection("users").find().limit(50).toArray(callback);
};

const queyUser = async (id, callback) => {
  const conexion = getDB();
  await conexion
    .collection("users")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const queryOrCreateUsers = async (req, callback) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const user_token = jwt_decode(token)["http://localhost/userData"];
  const conexion = getDB();
  await conexion
    .collection("users")
    .findOne({ email: user_token.email }, async (err, response) => {
      console.log("response consulta bd", response);
      if (response) {
       callback(err, response)
      } else {
        user_token.auth0ID = user_token._id;
        delete user_token._id;
        user_token.role = "Sin rol";
        user_token.status = "Pendiente";
        await createUsers(user_token, (err, respuesta) => callback(err, user_token)
        );
      }
      
    });
};

const queryOrCreateUser = async (callback)=>{
  /* 1. obtener los datos del usuario desde el token */

  /* 2.  Con Auth0 verificar si el usuario ya está en la BD o no*/

  /* 3.  si el usuario ya está en BD devuelve info del usuario*/

  /*  4. si el usuarios no está en la BD, lo crea y devulve la info*/
}

const createUsers = async (datesUsers, callback) => {
  if (
    // Object.keys(datesUsers).includes("name") &&
    // Object.keys(datesUsers).includes("lastname") &&
    // Object.keys(datesUsers).includes("state") &&
    // Object.keys(datesUsers).includes("role") &&
     Object.keys(datesUsers).includes("email")
  ) {
    const conexion = getDB();
    await conexion.collection("users").insertOne(datesUsers, callback);
  } else {
    return "error";
  }
};

const editUsers = async (id, edit, callback) => {
  const filterUser = { _id: new ObjectId(id) };
  const operation = {
    $set: edit,
  };
  const conexion = getDB();
  await conexion
    .collection("users")
    .findOneAndUpdate(
      filterUser,
      operation,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const deleteUsers = async (_id, callback) => {
  const filterUser = { _id: new ObjectId(_id) };
  const conexion = getDB();
  await conexion.collection("users").deleteOne(filterUser, callback);
};

export {
  queryAllUsers,
  createUsers,
  editUsers,
  deleteUsers,
  queryOrCreateUsers,
  queyUser,
};

import { getDB } from "../../db/db.js";
import { ObjectId } from "bson";

const queryAllUsers = async (callback) => {
    const conexion = getDB();
      await conexion
      .collection("users")
      .find()
      .limit(50)
      .toArray(callback);
}

const createUsers = async (datesUsers, callback) => {
    
    if (
      Object.keys(datesUsers).includes("name") &&
      Object.keys(datesUsers).includes("lastname") &&
      Object.keys(datesUsers).includes("state") &&
      Object.keys(datesUsers).includes("role") &&
      Object.keys(datesUsers).includes("email")
    ) {
      const conexion = getDB();
      conexion.collection("users").insertOne(datesUsers, callback);
    }else {
        return "error";
    }
};

const editUsers = async (edit, callback)=>{
  const filterUser = { _id: new ObjectId(edit.id) };
  delete edit.id;
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

}

export {queryAllUsers, createUsers, editUsers};

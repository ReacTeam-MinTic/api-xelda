import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

//MÓDULO DE PRODUCTOS
const queryAllSales = async (callback) => {
    
    const conexion = getDB();
    await conexion.collection("sales").find().limit(50).toArray(callback);
  };
  
  const createSales = async (datesSales, callback) => {
    console.log("si.... datesSales", datesSales)
    if (
      Object.keys(datesSales).includes("cod") &&
      Object.keys(datesSales).includes("date") &&
      Object.keys(datesSales).includes("id_customer") &&
      Object.keys(datesSales).includes("customer") &&
      Object.keys(datesSales).includes("cost") &&
      Object.keys(datesSales).includes("amount") &&
      Object.keys(datesSales).includes("seller") &&
      Object.keys(datesSales).includes("products") &&
      Object.keys(datesSales).includes("total_value") 

    ) {
      const conexion = getDB();
      await conexion.collection("sales").insertOne(datesSales, callback);
    } else {
      return "error";
    }
  };
  
  const editSales = async (id, edit, callback) => {
    const filterProduct = { _id: new ObjectId(id) };
    const operation = {
      $set: edit,
    };
    const conexion = getDB();
    await conexion
      .collection("sales")
      .findOneAndUpdate(
        filterProduct,
        operation,
        { upsert: true, returnOriginal: true },
        callback
      );
  };
  
  const deleteSales = async (_id, callback) => {
    const filterProduct = { _id: new ObjectId(_id) };
    const conexion = getDB();
    await conexion.collection("sales").deleteOne(filterProduct, callback);
  };
  
  export {
    queryAllSales,
    createSales,
    editSales,
    deleteSales,
  };
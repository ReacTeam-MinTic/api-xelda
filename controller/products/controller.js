import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

//MÓDULO DE PRODUCTOS
const queryAllProducts = async (callback) => {
    
    const conexion = getDB();
    await conexion.collection("products").find().limit(50).toArray(callback);
  };
  
  const createProducts = async (datesProducts, callback) => {
    //console.log("datesProducts:", datesProducts)
    if (
      Object.keys(datesProducts).includes("cod") &&
      Object.keys(datesProducts).includes("name") &&
      Object.keys(datesProducts).includes("description") &&
      Object.keys(datesProducts).includes("value_") &&
      Object.keys(datesProducts).includes("status")
    ) {
      const conexion = getDB();
      await conexion.collection("products").insertOne(datesProducts, callback);
    } else {
      return "error";
    }
  };
  
  const editProducts = async (id, edit, callback) => {
    const filterProduct = { _id: new ObjectId(id) };
    const operation = {
      $set: edit,
    };
    const conexion = getDB();
    await conexion.collection("products").findOneAndUpdate(
        filterProduct,
        operation,
        { upsert: true, returnOriginal: true },
        callback
      );
  };
  
  const deleteProducts = async (_id, callback) => {
    const filterProduct = { _id: new ObjectId(_id) };
    const conexion = getDB();
    await conexion.collection("products").deleteOne(filterProduct, callback);
  };
  
  export {
    queryAllProducts,
    createProducts,
    editProducts,
    deleteProducts,
    editProductsFromSales,
  };
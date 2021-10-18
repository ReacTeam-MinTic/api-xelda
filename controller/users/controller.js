
import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';
import jwt_decode from 'jwt-decode'

//MÓDULO DE USUARIOS
const queryAllUsers = async (callback) => {
    const conexion = getDB();
      await conexion
      .collection('users')
      .find()
      .limit(50)
      .toArray(callback);
};

const queryOrCreateUser = async (req, callback)=>{
  /* 1. obtener los datos del usuario desde el token */
  const token = req.headers.authorization.split('Bearer ')[1]
  const user = jwt_decode(token)['http://localhost/userData']
  console.log(user)
  /* 2.  Con Auth0 verificar si el usuario ya está en la BD o no*/
  const conexion = getDB()
  await conexion.collection('users').findOne({ email: user.email}, async (err, response)=>{
    console.log('Respuesta consulta BD: ', response)
    if(response){
      /* 3.  si el usuario ya está en BD devuelve info del usuario*/
      callback(err, response)
    }else{
      /*  4. si el usuarios no está en la BD, lo crea y devulve la info*/
      user.auth0ID = user._id
      delete user._id
      user.rol = 'inactivo'
      await creacionUsuario(user, (err, respuesta) => callback(err, user))
    }
  })
}

const creacionUsuario = async (datesUsers, callback) => {
  const conexion = getDB()
  await conexion.collection('users').insertOne(datesUsers, callback)
}

const createUsers = async (datesUsers, callback) => {
    
    if (
      Object.keys(datesUsers).includes('name') &&
      Object.keys(datesUsers).includes('lastname') &&
      Object.keys(datesUsers).includes('state') &&
      Object.keys(datesUsers).includes('role') &&
      Object.keys(datesUsers).includes('email')
    ) {
      const conexion = getDB();
      await conexion.collection('users').insertOne(datesUsers, callback);
    }else {
        return 'error';
    }
};

const editUsers = async (id, edit, callback) => {
  const filterUser = { _id: new ObjectId(id) };
  const operation = {
    $set: edit,
  };
  const conexion = getDB();
  await conexion
    .collection('users')
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
  await conexion.collection('users').deleteOne(filterUser, callback);
};


export {queryAllUsers, queryOrCreateUser, createUsers, editUsers, deleteUsers};

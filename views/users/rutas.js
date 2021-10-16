import Express from 'express';
import {queryAllUsers, queryOrCreateUser, createUsers, editUsers, deleteUsers } from '../../controller/users/controller.js';

const rutaUsers = Express.Router();

const genericCallBack = (res) => (err, result) => {
  if (err) {
    console.log("aqui", err);
    res.status(500).send('Error consultando los vehiculos');
  } else {
    res.json(result);
  }
};

rutaUsers.route('/users').get((req, res) => {
  console.log(
    'Esta es la función que se ejecuta cuando se llama a la ruta /users'
  );
  queryAllUsers(genericCallBack(res));
});

rutaUsers.route('/users').post((req, res) => { 
  createUsers(req.body, genericCallBack(res));
});

rutaUsers.route('/users/self').get((req, res) => {
  console.log('Alguien hizo get en la ruta /self');
  queryOrCreateUser(req, genericCallBack(res))
  /* queryAllUsers(genericCallBack(res)); */
});

rutaUsers.route('/users/:id').patch((req, res) => {
  editUsers(req.params.id, req.body, genericCallBack(res));
});

rutaUsers.route('/users/:id').delete((req, res) => {
  deleteUsers(req.params.id, genericCallBack(res));
});

export default rutaUsers;

import Express from 'express';
import {queryAllProducts, createProducts, editProducts, deleteProducts } from '../../controller/products/controller.js';

const rutaProducts = Express.Router();

const genericCallBack = (res) => (err, result) => {
  if (err) {
    //console.log("aqui", err);
    res.status(500).send('Error consultando los vehiculos');
  } else {
    res.json(result);
  }
};

rutaProducts.route('/products').get((req, res) => {
  console.log(
    'Esta es la función que se ejecuta cuando se llama a la ruta /Products'
  );
  queryAllProducts(genericCallBack(res));
});

rutaProducts.route('/products').post((req, res) => {
    //console.log("siii", req)
  createProducts(req.body, genericCallBack(res));
});

rutaProducts.route('/products/:id').patch((req, res) => {
  const body_ = req.body;
  if(parseInt(body_.inventory) > 0 ){
    body_.status = "Disponible"
  }else{
    body_.status = "No disponible"
  }
  console.log("si", body_)
  editProducts(req.params.id, body_, genericCallBack(res));
  
});

rutaProducts.route('/products/:id').delete((req, res) => {
  deleteProducts(req.params.id, genericCallBack(res));
});

export default rutaProducts;
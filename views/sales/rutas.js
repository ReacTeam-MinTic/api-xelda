import Express from 'express';
import {queryAllSales, createSales, editSales, deleteSales } from '../../controller/sales/controller.js';

const rutaSales = Express.Router();

const genericCallBack = (res) => (err, result) => {
  if (err) {
    console.log("aqui", err);
    res.status(500).send('Error consultando los vehiculos');
  } else {
    res.json(result);
  }
};

rutaSales.route('/sales').get((req, res) => {
  console.log(
    'Esta es la función que se ejecuta cuando se llama a la ruta /sales'
  );
  queryAllSales(genericCallBack(res));
});

rutaSales.route('/sales').post((req, res) => {
  createSales(req.body, genericCallBack(res));
});

rutaSales.route('/sales/:id').patch((req, res) => {
  editSales(req.params.id, req.body, genericCallBack(res));
});

rutaSales.route('/sales/:id').delete((req, res) => {
  deleteSales(req.params.id, genericCallBack(res));
});

export default rutaSales;
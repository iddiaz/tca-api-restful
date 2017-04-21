'use strict'

const express = require('express');
const ProductCtrl = require('./../controllers/product')
const api = express.Router();
const auth = require('./../middlewares/auth');


// obtener productos
api.get('/product', ProductCtrl.getProducts);

// obtener producto
api.get('/product/:productId', ProductCtrl.getProduct );

// guardar producto en bd
api.post('/product', ProductCtrl.saveProduct);

// actualizaciones de producto
api.put('/product/:productId', ProductCtrl.updateProduct);

// borrar producto bd
api.delete('/product/:productId', ProductCtrl.deleteProduct );

// Ruta privada
api.get('/private', auth.isAuth, function( req, res) {
  res.status(200).send({message: 'Tienes acceso'});
});

module.exports = api;
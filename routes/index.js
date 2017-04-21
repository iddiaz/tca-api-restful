'use strict'

const express = require('express');
const ProductCtrl = require('./../controllers/product')
const userCtrl = require('./../controllers/user');
const auth = require('./../middlewares/auth');
const api = express.Router();


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

// registro
api.post('/signup', userCtrl.signUp);
// Login
api.post('/signin', userCtrl.signIn);
// Ruta privada
api.get('/private', auth, ( req, res) => {
  res.status(200).send({message: 'Tienes acceso'});
});

module.exports = api;
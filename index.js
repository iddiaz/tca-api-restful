'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import models
const Product = require('./models/product');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// RUTAS
// url de pruebas
// app.get('/hola/:name', (req,res) =>{
//   res.send({message: `Hola ${req.params.name}`})
// })

// obtener productos
app.get('/api/product', (req,res) =>{
  res.status(200).send({products: []});
});

app.get('/api/product/:productId', (req, res) => {

});

// subir productos
app.post('/api/product', (req, res) =>{
  console.log('POST /api/product');
  console.log(req.body);

  let product = new Product();
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description

  // guarda el producto en bd
  product.save((err, productStored) =>{
    if (err) res.status(500).send({message: `Error al salvar en la base de datos ${err}`});

    res.status(200).send({product: productStored })

  })
});

// actualizaciones
app.put('/api/product/:productId', (req,res)=> {

});

// borrar producto bd
app.delete('/api/product/:productId', (req,res) =>{

});

// conexion con bd
mongoose.connect('mongodb://localhost:27017/shop', (err, res)=>{
  if(err) {
    console.log(`Error al conectar a la base de datos: ${err}`);
  }
  console.log('Conexión a la base de datos extablecida...');

  app.listen(port, ()=> {
    console.log(`API REST corriendo en http://localhost:${port}`);
  });
});

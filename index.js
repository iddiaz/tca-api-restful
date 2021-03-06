
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');


// conexion con bd
mongoose.connect(config.db , (err, res)=>{
  if(err) {
    console.log(`Error al conectar a la base de datos: ${err}`);
  }
  console.log('Conexión a la base de datos extablecida...');

  app.listen(config.port, ()=> {
    console.log(`API REST corriendo en http://localhost:${config.port}`);
  });
});

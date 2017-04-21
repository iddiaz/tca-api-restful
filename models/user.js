'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bccrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema ({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String,
  // select: false => la contraseña no la envia al usuario en caso de hacer un get
  password: { type: String, select: false},
  signupDate: { type: Date, default: Date.now()},
  lastLogin: Date
});

// Encriptación de password de usuario
UserSchema.pre('save', (next) =>{
  let user = this;
  if(!user.isModified('password')) return next();

  bccrypt.genSalt(10, (err, salt)=>{
    if(err) return next( err );

    bccrypt.hash( user.password, salt, null, (err, hash)=>{
      if(err) return next(err);

      user.password = hash;
      next();
    });
  });
});

// avatar para usuario a partir de email desde la web de gravatar
UserSchema.methods.gravatar = function(){
  // si no existe el email en gravatar, devuelve un avatar por defecto
  if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`;

  // si ha introducido mail en gravatar devuelve su avatar en caso de que lo tenga subido
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `http://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

module.exports = mongoose.model('user', UserSchema );
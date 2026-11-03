const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Por favor introduce el nombre de usuario']
    },
    email: {
        type: String, 
        required: [true, 'Por favor introduce el email del usuario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor introduce la contraseña del usuario'],
    },
    esAdmin :{
        type : Boolean,
        default: false, 
    }


}, {
    timestamps:true
})
module.exports = mongoose.model('User', userSchema)

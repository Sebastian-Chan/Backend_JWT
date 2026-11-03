const mongoose = require('mongoose')

const TareasSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' //modelo del cual se va a referenciar (colección/tabla)
    },
    descripcion: {
        type: String,
        required: [true, "Por favor teclea una descripcion"]
    }
},{
    timestamps: true

})

module.exports = mongoose.model('Tarea', TareasSchema) 
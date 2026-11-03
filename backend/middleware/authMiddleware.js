const jwt = require('jsonwebtoken')
const asyncHandler = require ('express-async-handler')
const User = require('../models/usersModel')

const protect = asyncHandler(async(req, res, next) =>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        //Obtenemos el token 
        token = req.headers.authorization.split(' ')[1] 

        //verificamos que el token esté firmaod por nuestro backend
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id_usuario).select('-password')
        //todas las funciones que son protect tendrán acceso a estos datos.        
        next()

    }else{
        res.status(401)
        throw new Error("Acceso no autorizado")
    }
    if(!token){
        res.status(401)
        throw new Error('Acceso no autorizado, no proporcioaste un token')
    }
})
module.exports = protect
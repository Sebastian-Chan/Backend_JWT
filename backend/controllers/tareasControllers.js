 
const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareasModel')

const getTareas = asyncHandler(async(req,res) => {//hay request y response por parte de la API
    const tareas = await Tarea.find({user: req.user.id})//Obligamos que solo se muestren las tareas del usuario logeado
    //devolverá en typo JSON todas las tareas
    res.status(200).json(tareas)
})

const createTareas = asyncHandler(async(req, res)=>{ 
    if(!req.body.descripcion) { 
        res.status(400)
        throw new Error("Porfavor teclea la descripcion")
    }
    const tarea = await Tarea.create({
        user: req.user.id,
        descripcion : req.body.descripcion
    })
    res.status(201).json({tarea})


})
const updateTareas = asyncHandler(async (req, res)=>{ 
    
    const tarea = await Tarea.findById(req.params.id) 
    if(!tarea){
        res.status(404)
        throw new Error("La tarea especificada no se encuentra")
    }else{  
        //verificamos que la tarea exista y le pertenezca al usuario del token:
        if(tarea.user.toString() !== req.user.id){
            res.status(401)
            throw new Error("Acceso no autorizado")
        }else{
            //usamos valor bool para que devuelva el nuevo valor
            const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true} ) 
            res.status (200).json(tareaUpdated)
        }
    }
})

const deleteTareas =asyncHandler(async(req, res)=>{ 
    const tarea = await Tarea.findById(req.params.id) 
    if(!tarea){
        res.status(404)
        throw new Error("La tarea especificada no se encuentra")
    }else{
        if(tarea.user.toString() !== req.user.id){
            res.status(401)
            throw new Error("Acceso no autorizado")
        }else{
            await tarea.deleteOne() 
            res.status(200).json({id: req.params.id})
            
        }
    }
})
module.exports= {getTareas, createTareas, updateTareas, deleteTareas}

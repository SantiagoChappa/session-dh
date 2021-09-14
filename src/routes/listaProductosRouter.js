const express = require('express')
const router = express.Router()
const listaProductosController = require('../controllers/listaProductosController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
    cb(null, 'public/img/productos')
    },
    filename: (req, file, cb)=>{
        let nombreArchivo= 'products-'+ Date.now() + path.extname(file.originalname)
        cb(null, nombreArchivo)
    }
})
const upload= multer({storage})

//Muestra todo el listado de productos de productos.json
router.get('/', listaProductosController.listado)

//Muestra detalle de cada producto
router.get('/detalle/:id', listaProductosController.detalle)

//Muestra el formulario de crear un producto y el envio de los datos a prodcutos.json
router.get('/crear', listaProductosController.crearProducto)
router.post('/crear', upload.single('image'), listaProductosController.envioProducto)

//Muestra formulario para editar y el envio de datos para reemplazar
router.get('/editar/:id', listaProductosController.editar)
router.put('/editar/:id', upload.single('image'),listaProductosController.envioEdicion)

//eliminar
router.delete('/eliminar/:id', listaProductosController.eliminar)

module.exports= router;
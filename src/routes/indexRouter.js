 const express = require('express')
 const multer = require('multer')
 const path = require('path')
 const { check }= require('express-validator')
 const router = express.Router()
 const indexController = require('../controllers/indexController')


 const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
    cb(null, 'public/img/usuarios')
    },
    filename: (req, file, cb)=>{
        let nombreArchivo= 'usuario-'+ Date.now() + path.extname(file.originalname)
        cb(null, nombreArchivo)
    }
})

const validationRegister= [
    check('fullName').notEmpty().withMessage('Debes completar el campo con tu nombre completo'),
    check('email').notEmpty().withMessage('Debes ingresar un email').bail()
    .isEmail().withMessage('Debes introducir un formato de email valido'),
    check('password').notEmpty().withMessage('Debes introducir una contraseña').bail()
    .isLength({min: 6}).withMessage('Debe contener al menos 6 caracteres'),
    check('image').custom((value, { req })=>{
        let file = req.file
        let acceptedExtension= ['.jpg', '.png', '.jpeg']
        if(!file){
            throw new Error('Tienes que subir una imagen')
        }else{
            let fileExtension = path.extname(file.originalname)
            if(!acceptedExtension.includes(fileExtension)){
                throw new Error('Las extensiones permitidas son ${acceptedExtension.join(',')}')
            }
        }
        return true;
    })
]

const validationLogin= [
    check('emailLogin').notEmpty().withMessage('Debes ingresar un email').bail()
    .isEmail().withMessage('Email invalido'),
    check('passwordLogin').notEmpty().withMessage('Debes introducir una contraseña').bail()
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres')
]

const upload= multer({storage})

router.get('/', indexController.index)

router.get('/ingreso', indexController.login)
router.post('/ingreso', validationLogin, indexController.processLogin)

router.get('/check', (req,res)=>{
    if(req.session.userLogueado == undefined){
        res.send('No esta logueado')
    }else{
        res.send('El usuario logueado es '+ req.session.userLogueado)
    }
})

router.get('/registro', indexController.register)
router.post('/registro', upload.single('image'), validationRegister, indexController.processRegister)

router.get('/carrito-de-compras', indexController.carrito)

module.exports = router;
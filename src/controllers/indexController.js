const path = require('path')
const fs = require('fs')
const usuariosPath = path.join(__dirname,'../data/usuarios.json')
const usuarios = JSON.parse(fs.readFileSync(usuariosPath,'utf-8'))
const Usuarios= require('../models/usuariosModels')
const Productos= require('../models/productosModulo')
const { validationResult } = require('express-validator')

const indexController={
    index: (req,res)=>{
        let productos= Productos.GetAll()
        res.render('index', {productos})
    },
    register: (req, res)=>{
        res.render('register')
    },
    processRegister: (req,res)=>{
        let errors = validationResult(req)
        if (errors.isEmpty()){
        let usuario={
            id: usuarios.length +1,
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            image: req.file.filename
        }
        
        let usuariosActualizados;
        if(usuarios == ""){
             usuariosActualizados= []
        }else{
             usuariosActualizados=usuarios
        }

        usuariosActualizados.push(usuario)

        Usuarios.Agregar(usuariosActualizados)

        res.redirect('/')
        }else{
            res.render('register',{ errors: errors.mapped(), oldBody: req.body})
        }
    },
    login: (req,res)=>{
        res.render('login')
    },
    processLogin: (req, res)=>{
        let errors = validationResult(req)
        if (errors.isEmpty()){
            let usersJSON= fs.readFileSync(path.join(__dirname,'../data/usuarios.json'), {encoding:'utf-8'})
            let users;   
            if(usersJSON == ""){
                users = [];
            }else{
                users = JSON.parse(usersJSON)
                console.log(users)
            }
            let usuarioALoguearse;

            
            for(let i=0; i < users.length; i++){
                if(users[i].email == req.body.emailLogin){
                    if (bcrypt.compareSync(req.body.passwordLogin, users[i].password)){
                        return usuarioALoguearse = users[i];
                    }
                }
            }

            if(usuarioALoguearse == undefined){
                return res.render('login', {errors: [
                    {msg:'Credenciales Invalidas'}
                ]});
            }
           
        req.session.userLogueado = usuarioALoguearse;
        res.redirect('/') 

        }else{
            res.render('login', {errors: errors.mapped()})
        }
    },
    carrito: (req,res)=>{
        res.render('carrito')
    }
    
}
module.exports= indexController;
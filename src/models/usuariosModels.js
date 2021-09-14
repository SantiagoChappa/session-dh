const fs = require('fs')
const path = require('path')
const multer = require('multer')
const usuariosPath = path.join(__dirname,'../data/usuarios.json')
const usuarios = JSON.parse(fs.readFileSync(usuariosPath,'utf-8'))


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usuariosModulo={
    GetAll: ()=>{
        return usuarios
    },
    Agregar: (data)=>{
        fs.writeFileSync(usuariosPath, JSON.stringify(data))
    },
    BuscarId: (id)=>{
        return  usuarios.find(usuario => String(usuario.id) === id)
    }
}

module.exports= usuariosModulo;
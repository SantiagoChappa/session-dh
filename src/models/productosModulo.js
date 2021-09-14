const fs = require('fs')
const path = require('path')
const multer = require('multer')
const productosPath = path.join(__dirname,'../data/productos.json')
const productos = JSON.parse(fs.readFileSync(productosPath,'utf-8'))


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productosModulo={
    GetAll: ()=>{
        return productos
    },
    Agregar: (data)=>{
        fs.writeFileSync(productosPath, JSON.stringify(data))
    },
    BuscarId: (id)=>{
        return  productos.find(producto => String(producto.id) === id)
    },
    searchByName:(stringToSearch) => {
        return data.filter(elem => elem.name.includes(stringToSearch))
    }
}

module.exports= productosModulo;
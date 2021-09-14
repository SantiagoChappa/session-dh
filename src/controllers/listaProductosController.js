const Productos= require('../models/productosModulo')


const listaProductosController={
    listado: (req,res)=>{
        let productoAll = Productos.GetAll()
        res.render('listado', { producto : productoAll })
    },
    detalle: (req,res)=>{
        let productoBuscado= Productos.BuscarId(req.params.id)

        res.render('detalle-producto', { producto : productoBuscado })
    },
    crearProducto: (req,res)=>{
        let productobuscado = Productos.GetAll()
        res.render('form-producto', {producto: productobuscado})
    },
    envioProducto: (req,res)=>{
        let productosAll=  Productos.BuscarId(req.params.id)
        if(req.file){
            /* Producto nuevo  */
        let productoNuevo={
            id: productosAll.length + 1,
            name: req.body.name,
            description: req.body.description,
            discount: req.body.discount,
            price: Number(req.body.price),
            category: req.body.category,
            image: req.file.filename,
            colors: req.body.colors
        }
        /* Enviar nuevo objeto al final del array */ 
            let productosActualizado= [...productosAll, productoNuevo]
            
            Productos.Agregar(productosActualizado)

            res.redirect('/')
        }else{
            res.redirect('/productos/crear')
        }
        
           
    },
    editar: (req, res)=>{
        let productoBuscado = Productos.BuscarId(req.params.id)
        res.render('form-producto',{producto : productoBuscado})
    },
    envioEdicion: (req, res)=>{
        let file = req.file
        let productoEditado= Productos.GetAll().map(producto =>{
            if(producto.id == req.params.id && file != 'undefined'){
                producto.name = req.body.name
				producto.price = req.body.price
				producto.description = req.body.description
				producto.category = req.body.category
				producto.discount = req.body.discount
                producto.colors = req.body.colors
                producto.image = req.file.filename  
            }else{
                producto.name = req.body.name
				producto.price = req.body.price
				producto.description = req.body.description
				producto.category = req.body.category
				producto.discount = req.body.discount
                producto.colors = req.body.colors
            }
            return producto
        }) 

        Productos.Agregar(productoEditado)
        res.redirect('/productos')
    },
    eliminar: (req, res)=>{
        let productoEliminar= Productos.GetAll().filter(producto=>{
            return producto.id != req.params.id
        })
        Productos.Agregar(productoEliminar)
        res.redirect('/productos')
    }
}
module.exports= listaProductosController;
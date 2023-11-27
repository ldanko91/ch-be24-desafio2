import fs from 'fs'

class ProductManager {
    constructor (title, description, price, thumbnail, code, stock) {
        this.title=title
        this.description=description
        this.price=price
        this.thumbnail=thumbnail
        this.code=code
        this.stock = stock
        this.path = './products.txt'  
    }


    addProduct = (title, description, price, thumbnail, code, stock) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Products = JSON.parse(content)
        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios!")
        }else{
            if (Products.some(producto => producto.code === code)) {
                console.log("El campo code ya existe!")
            }else{
            let id
            let idAuto = () => {
                let maxId = Products.length
                id = (maxId + 1)
                return id
            }
            
            id = idAuto()
            let newProd = {
                id: id,
                title:title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code:code,
                stock: stock,
            }
                return (
                    Products.push(newProd),
                    fs.writeFileSync(this.path, JSON.stringify(Products)),
                    console.log(`Producto con id ${id} añadido correctamente`)
                )
    }
    }
    }
    

    getProducts = () => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Products = JSON.parse(content)
        console.table(Products)
    }

    getProductById = (prodId) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Products = JSON.parse(content)
        if (!Products.some(producto => producto.id === prodId)) {
            console.log("El producto buscado no existe!")
        }else{

            let prodIndex = Products.findIndex(producto => producto.id === prodId)
            return console.table(Products[prodIndex])
        }
    }  

    updateProduct = (prodId, title, description, price, thumbnail, code, stock) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Products = JSON.parse(content)
        if (!Products.some(producto => producto.id === parseInt(prodId))) {
            console.log("El producto buscado no existe!")
        }else{
            let updatedProd = {
                id: prodId,
                title:title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code:code,
                stock: stock,
            }
            let prodIndex = Products.findIndex(producto => producto.id === parseInt(prodId))
            Products.splice(Products[prodIndex],1)

            return (
                console.table(Products),
                Products.push(updatedProd),
                console.table(Products),
                fs.writeFileSync(this.path, JSON.stringify(Products)),
                console.log(`Producto con ID ${prodId} actualizado correctamente`)
                )}
    }

    deleteProduct = (prodId) => {
        let content = fs.readFileSync(this.path, 'utf-8')
        let Products = JSON.parse(content)
        if (!Products.some(producto => producto.id === prodId)) {
            console.log("El producto buscado no existe!")
        }else{
            let prodIndex = Products.findIndex(producto => producto.id === prodId)
            Products.splice(Products[prodIndex],1)
            return (
                fs.writeFileSync(this.path, JSON.stringify(Products)),
                console.log(`Producto con ID ${prodId} eliminado del listado`)
                )}
    }
}

const Manager1 = new ProductManager;

// //Muestra inicial
// Manager1.getProducts()

// //Prueba código repetido
// console.log("Prueba producto repetido")
// Manager1.addProduct("prueba1", "producto de pruebas", 100, "foto.jpg", "abc123", 10)

//Prueba atributo faltante
console.log("Prueba atributo faltante")
Manager1.addProduct("prueba1", "producto de pruebas", 100,  "abz123", 10)

//Añadir productos
Manager1.addProduct("añadido1", "description1", 125, "foto2.jpg", "azz123", 5)
Manager1.addProduct("añadido2", "description2", 250, "foto332.jpg", "a5z123", 15)
Manager1.addProduct("añadido3", "description3", 1225, "foto1222.jpg", "azz1423", 22)

//Mostrar productos añadidos
Manager1.getProducts()

//Buscar producto por ID
console.log("Búsqueda por ID")
Manager1.getProductById(2)

//Búsqueda ID inexistente
console.log("Búsqueda ID inexistente")
Manager1.getProductById(8)

//Actualizar producto por ID
console.log("Actualizar producto por ID")
Manager1.updateProduct(3,"editado3", "descriptionedited3", 121225, "edited.jpg", "edit-azz1423", 44)

//Borrar producto por ID
console.log("Borrar producto por ID")
Manager1.deleteProduct(2)

//Mostrar productos editados
Manager1.getProducts()
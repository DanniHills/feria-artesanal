import config from "../config"

export default class ArtesanoService{

    crearProducto(producto){
        return fetch( config.backendUrl + '/api/Producto', {method: 'POST', headers: { }, body: producto })
    }

    buscarProductos(){
        return fetch( config.backendUrl + '/api/Producto/', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    buscarProducto(prod_id){
        return fetch( config.backendUrl + '/api/Producto/'+ prod_id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    buscarProductoArtiD(art_id){
        return fetch( config.backendUrl + '/api/Producto/'+ art_id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    eliminarProductos(prod_id){
        return fetch( config.backendUrl + '/api/Producto/' + prod_id , {method: 'DELETE', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }

     actualizarProductos(prod_id, producto){
        return fetch( config.backendUrl + '/api/Producto/' + prod_id, {method: 'PUT', headers: { }, body: producto })
        .then(response => response.json())
    }
    buscarartesanodelpuesto(art_id){
        return fetch( config.backendUrl + '/api/Artesano/All/Art/'+ art_id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    informacionProductoArtesano(prod_id){
        return fetch( config.backendUrl + '/api/Producto/detalleArtesanoMateriales/'+ prod_id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
}
import config from "../config"

export default class AdministradorService{
    buscarAdmin(admin_id){
        return fetch( config.backendUrl + '/api/artesano', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    crearArtesano(artesano){
        return fetch( config.backendUrl + '/api/artesano', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(artesano)})
        .then(response => response.json())
    }
    actualizarArtesano(art_id, artesano){
        return fetch( config.backendUrl + '/api/artesano/' + art_id, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(artesano)})
    }
    buscarArtesanos(){
        return fetch( config.backendUrl + '/api/artesano', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }

    eliminarArtesano(art_id){
        return fetch( config.backendUrl + '/api/artesano/' + art_id , {method: 'DELETE', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    buscarUnArtesanos(art_id){
        return fetch( config.backendUrl + '/api/artesano'+ art_id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    crearFeria(feria){
        return fetch( config.backendUrl + '/api/FeriaArtesanal', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(feria)})
    }
    buscarFeria(){
        return fetch( config.backendUrl + '/api/FeriaArtesanal', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    actualizarFeria(feria_id, feria){
        return fetch( config.backendUrl + '/api/FeriaArtesanal/' + feria_id, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(feria) })
        .then(response => response.json())
    }
    actualizarPuesto(pArt_id, puesto){
        return fetch( config.backendUrl + '/api/PuestoArtesanal/' + pArt_id, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(puesto) })
        .then(response => response.json())
    }
    eliminarFeria(feria_id){
        return fetch( config.backendUrl + '/api/FeriaArtesanal/' + feria_id , {method: 'DELETE', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    buscarPuesto(){
        return fetch( config.backendUrl + '/api/PuestoArtesanal/getProductos/', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    eliminarPuesto(pArt_id){
        return fetch( config.backendUrl + '/api/PuestoArtesanal/' + pArt_id , {method: 'DELETE', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }

    crearPuesto(puesto){
        return fetch( config.backendUrl + '/api/PuestoArtesanal', {method: 'POST', headers: { }, body: puesto })
    }
}
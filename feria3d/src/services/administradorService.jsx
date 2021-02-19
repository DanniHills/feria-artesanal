export default class AdministradorService{
    buscarAdmin(admin_id){
        return fetch('http://localhost:8080/api/artesano', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    crearArtesano(artesano){
        return fetch('http://localhost:8080/api/artesano', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(artesano)})
        .then(response => response.json())
    }
    actualizarArtesano(art_id, artesano){
        return fetch('http://localhost:8080/api/artesano/' + art_id, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(artesano)})
    }
    buscarArtesanos(){
        return fetch('http://localhost:8080/api/artesano', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }

    eliminarArtesano(art_id){
        return fetch('http://localhost:8080/api/artesano/' + art_id , {method: 'DELETE', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    buscarUnArtesanos(art_id){
        return fetch('http://localhost:8080/api/artesano'+ art_id, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    crearFeria(feria){
        return fetch('http://localhost:8080/api/FeriaArtesanal', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(feria)})
    }
    buscarFeria(){
        return fetch('http://localhost:8080/api/FeriaArtesanal', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    actualizarFeria(feria_id, feria){
        return fetch('http://localhost:8080/api/FeriaArtesanal/' + feria_id, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(feria) })
        .then(response => response.json())
    }
    actualizarPuesto(pArt_id, puesto){
        return fetch('http://localhost:8080/api/PuestoArtesanal/' + pArt_id, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(puesto) })
        .then(response => response.json())
    }
    eliminarFeria(feria_id){
        return fetch('http://localhost:8080/api/FeriaArtesanal/' + feria_id , {method: 'DELETE', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    buscarPuesto(){
        return fetch('http://localhost:8080/api/PuestoArtesanal', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }
    eliminarPuesto(pArt_id){
        return fetch('http://localhost:8080/api/PuestoArtesanal/' + pArt_id , {method: 'DELETE', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }

    crearPuesto(puesto){
        return fetch('http://localhost:8080/api/PuestoArtesanal', {method: 'POST', headers: { }, body: puesto })
    }
}
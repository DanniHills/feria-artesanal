export default class PuestosService {

    static rute = 'http://localhost:8080/api/PuestoArtesanal';

    static async obtenerPuestos() {
        const res = await fetch(`${PuestosService.rute}/getProductos/`);
        if (res.ok) {
            const jsonData = await res.json();
            return jsonData;
        } else {
            console.log(res);
            throw new Error(res.status);
        }
    }

    static async obtenerPuestoConProductos(pArt_id) {
        const res = await fetch(`${PuestosService.rute}/getProductos/${pArt_id}`);
        if (res.ok) {
            const jsonData = await res.json();
            return jsonData;
        } else {
            console.log(res);
            throw new Error(res.status);
        }
    }

    buscarPuestosArtesanoId(art_id){
        return fetch(`${PuestosService.rute}/Artesano/${art_id}`, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    } 

    buscarPuestos(){
        return fetch(`${PuestosService.rute}`, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    } 
    
    ordenarPuestos(ubicaciones){
        return fetch(`${PuestosService.rute}/ubicacion`, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: ubicaciones})
        .then(response => response.json())
    } 




}
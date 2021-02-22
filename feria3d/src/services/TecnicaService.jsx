import config from "../config";

export default class TecnicaService{

    buscarTecnicas(){
        return fetch( config.backendUrl + '/api/Tecnica', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }   

}
import config from "../config";

export default class MaterialService{

    buscarMateriales(){
        return fetch( config.backendUrl + '/api/material', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }   

}
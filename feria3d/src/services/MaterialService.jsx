export default class MaterialService{

    buscarMateriales(){
        return fetch('http://localhost:8080/api/material', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }   

}
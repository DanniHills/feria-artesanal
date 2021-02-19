export default class TecnicaService{

    buscarTecnicas(){
        return fetch('http://localhost:8080/api/Tecnica', {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        .then(response => response.json())
    }   

}
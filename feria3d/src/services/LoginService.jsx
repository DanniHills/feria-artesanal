import config from "../config";

export default class LoginService{

    login(correo, password){
        return fetch( config.backendUrl + '/api/login', {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({
                correo: correo,
                password: password
            })
        }).then(response => response.json())
    }

    

}
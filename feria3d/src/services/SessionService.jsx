import jwt from 'jsonwebtoken';

export default class SessionService{

    constructor(){
        this.token = localStorage.getItem('token');
    }

    setToken(token){
        localStorage.setItem('token', token);
    }

    logout(){
        localStorage.clear();
    }

    getUserData(){
        return jwt.decode(this.token);
    }

    getToken(){
        return this.token;
    }

    isLogged(){
        return (this.token && this.validateTokenTime());
    }

    getTipoAcceso(){
        return (this.token && this.getUserData().login.log_tipo);
    }

    validateTokenTime(){
        const user = jwt.decode(this.token);
        const time = Math.floor(new Date().getTime() / 1000);
        if( time >= user.exp ){
            localStorage.clear();
            return false;
        }
        return true;
    }
}
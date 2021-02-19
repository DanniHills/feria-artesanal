export default class CatalogoService {

    static rute = 'http://localhost:8080/api/Producto';

    static async obtenerCatalogo() {
        const res = await fetch(`${CatalogoService.rute}/`);
        if (res.ok) {
            const jsonData = await res.json();
            return jsonData;
        } else {
            console.log(res);
            throw new Error(res.status);
        }
    }

    static async detalleProducto(prod_id) {
        const res = await fetch(`${CatalogoService.rute}/` + prod_id);
        if (res.ok) {
            const jsonData = await res.json();
            return jsonData;
        } else {
            console.log(res);
            throw new Error(res.status);
        }
    }







}
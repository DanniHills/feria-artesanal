import React, {useCallback, useEffect, useState } from 'react';
import 'aframe';
import { Entity } from 'aframe-react';
import { Producto } from './producto';
import { useHistory } from 'react-router-dom';

export const PuestoArtesanal2 = (props) => {
    const uploadUrl = 'http://localhost/';
    const urlPuestoD = "../img/conmesa.glb";
    const XEntrar=(`${props.xEntrar}`);
    const YEntrar=(`${props.yEntrar}`);
    const ZEntrar=(`${props.zEntrar}`);

    const [productoHTML, setProductoHTML] = useState([]);
    useEffect(() => {
        if (props.productos !== undefined)
            setProductoHTML(generarProductos());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.productos]);

    function generarProductos() {
        console.log(props);
        /*let xM1 = props.xPuesto - 11; //24.2
        let yM1 = props.yPuesto - 0.5; //0.5
        let zM1 = props.zPuesto - 30; //83.4;
        let contadorMesalateral = 0;//contador mesa lateral para devolverse de der-izq
        let mesalateralCP = 0;//cantidad de productos maximo en ambas mesas laterales
        let ismesa = true;
        */
        let htmlProd = [];
        let mesacentral = 0;// contador producto principales, cantidad maxima en la mesa central
        let xC1 = props.xPuesto + 5;
        let yC1 = props.yPuesto - 0.95;
        let zC1 = props.zPuesto - 4;

        let ismesaC = true; // mesa central producto principal al lado 
        let contadorMesaCentral = 0;
        //let contadorEstante = 0;

        props.productos.forEach(producto => {
           /* if (contadorMesalateral === 4) {
                contadorMesalateral = 0;
                zM1 = props.zPuesto + 10;
                xM1 += 2;
            }*/
            if (contadorMesaCentral === 2) {
                contadorMesaCentral = 0;
                zC1 = props.zPuesto;
                xC1 += 2;
            }
            /*if (mesalateralCP < 20 && !producto.prod_principal) { //colocar maximos de productos no principales en mesas laterales n
                htmlProd.push(<Producto
                    key={producto.prod_id}
                    idProducto={producto.prod_id}
                    prod_nombre={producto.prod_nombre}
                    prod_descrip={producto.prod_descrip}
                    prod_scale={producto.prod_scale}
                    pArt_id ={producto.pArt_id}
                    urlProducto={uploadUrl + producto.prod_modelo3D}
                    xM1={xM1} yM1={yM1} zM1={zM1} />)

                if (ismesa) {
                    zM1 -= 3;
                    ismesa = !ismesa
                } else {
                    zM1 += 27;
                    ismesa = !ismesa
                }

                contadorMesalateral++;
            }*/

            //MESA CENTRAL + PRODUCTOS PRINCIPALES
            if (mesacentral < 11 && producto.prod_principal) {// maximo productos principales mesa central
                htmlProd.push(<Producto
                    key={producto.prod_id}
                    prod_id={producto.prod_id}
                    prod_nombre={producto.prod_nombre}
                    prod_descrip={producto.prod_descrip}
                    prod_scale={producto.prod_scale}
                    idProducto={producto.prod_id}
                    pArt_id={producto.pArt_id}
                    urlProducto={uploadUrl + producto.prod_modelo3D} xM1={xC1} yM1={yC1} zM1={zC1} />)

                if (ismesaC) {
                    zC1 -= 3;
                    ismesaC = !ismesaC
                } else {
                    zC1 += 20;
                    ismesaC = !ismesaC
                }
                contadorMesaCentral++;
            }
           
        });
        return htmlProd;
    }
    const history = useHistory();
    const handleClick = useCallback(() => history.push('/puesto/' + props.pArt_id), [history]);
    return (
        <>
            <a-assets>
                <a-asset-item id="puestoDer" src={`${process.env.PUBLIC_URL} ${urlPuestoD}`}></a-asset-item>
            </a-assets>
            {productoHTML}
            <Entity
                key={`${props.puestoid}`}
                gltf-model="#puestoDer"
                position={`${props.xPuesto} ${props.yPuesto} ${props.zPuesto}`}
                scale="0.8 0.8 0.8 "
                Rotation="0 180 0 " >
            </Entity>
            <Entity primitive="a-plane"
                color="red" 
                position={`${XEntrar} ${YEntrar} ${ZEntrar}`} 
                rotation="-48.92658499960638 -90.00021045914971 90.00021045914971" 
                height="10" width="10" material="" geometry="height: 5" scale="0.5 1 0.5"
                events={{
                    click: handleClick.bind(this)
                  }}>
            </Entity>
        </>
    );
}
//editar pos plano lado derecho 
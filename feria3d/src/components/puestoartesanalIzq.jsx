import React, { useCallback, useEffect, useState } from 'react';
import 'aframe';
import { Entity } from 'aframe-react';
import { Producto } from './producto';
import { useHistory } from 'react-router-dom';

export const PuestoArtesanal = (props) => {

    const uploadUrl = 'http://localhost/';
    const urlPuesto = "../img/conmesa.glb";
    const urlshop = "../img/shop.jpg";
    const XEntrar = (`${props.xEntrar}`);
    const YEntrar = (`${props.yEntrar}`);
    const ZEntrar = (`${props.zEntrar}`);
    const XlOGO = (`${props.xEntrar+1.918}`);
    const YlOGO = (`${props.yEntrar-4.813}`);
    const ZlOGO = (`${props.zEntrar+9.1}`);
    console.log("LOGO", XlOGO, YlOGO,ZlOGO);
    const [productoHTML, setProductoHTML] = useState([]);
    useEffect(() => {
        if (props.productos !== undefined)
            setProductoHTML(generarProductos());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.productos]);

    const generarProductos = useCallback(() => {
        /*let xM1 = props.xPuesto - 10;
       let yM1 = props.yPuesto - 0.5;
       let zM1 = props.zPuesto + 6.5;
       let contadorMesalateral = 0;//contador mesa lateral para devolverse de der-izq
       let mesalateralCP = 0;//cantidad de productos maximo en ambas mesas laterales
       let ismesa = true;
       */  console.log('logo',`${props.urlLogo}`)
        let htmlProd = [];
        let mesacentral = 0;// contador producto principales, cantidad maxima en la mesa central
        let xC1 = props.xPuesto + 9.3;
        let yC1 = props.yPuesto + 0.4; //OK
        let zC1 = props.zPuesto + 3;
        //console.log('central:' + xC1, yC1, zC1);
        let ismesaC = true; // mesa central producto principal al lado 
        let contadorMesaCentral = 0;
        /*let mesaEstante = 0;
        let contadorEstante = 0;
        let xE1 = props.xPuesto + 1;
        let yE1 = props.yPuesto + 6;
        let zE1 = props.zPuesto - 4;
        let ismesaE = true;*/


        props.productos.forEach(producto => {
            if (contadorMesaCentral === 1) {
                contadorMesaCentral = 0;
                zC1 -= 2;
            }

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
                    xC1 += 1;
                    zC1 -= 2;
                    ismesaC = !ismesaC
                } else {
                    zC1 -= 2;
                    ismesaC = !ismesaC
                }
                contadorMesaCentral++;
            }
        });
        return htmlProd;
    }, []);
  
    const history = useHistory();
    const handleClick = useCallback(() => history.push('/puesto/' + props.pArt_id), [history]);
    return (
        <>
            <a-assets>
                <a-asset-item name={props.name} class="puestosArtesanales" position={`${props.xPuesto} ${props.yPuesto} ${props.zPuesto}`} id={'puesto' + props.pArt_id + '-izq'} src={`${process.env.PUBLIC_URL} ${urlPuesto}`}></a-asset-item>
                <img
                    alt=""
                    id="logo"
                    src={ uploadUrl+`${props.urlLogo}`}
                    crossOrigin=""
                ></img>
          
            </a-assets>

            {productoHTML}
            <Entity
                key={`${props.puestoid}`}
                gltf-model={'#puesto' + props.pArt_id + '-izq'}
                position={`${props.xPuesto} ${props.yPuesto} ${props.zPuesto}`}
                scale="0.8 0.8 0.8 "
                Rotation="0 0 0 "
                light="intensity:  0.2;  type:  ambient;  angle:  90;  color:  #c6b9b9" >
            </Entity>
            <Entity
                src='#logo'
                color="pink"
                primitive="a-plane"
                position= {`${XlOGO} ${YlOGO} ${ZlOGO}`}
                rotation="0 90 -180"
                scale="-1.58 -0.35 1"
                height="10"
                width="10"

            />
        <Entity primitive="a-plane"
                src={`${process.env.PUBLIC_URL} ${urlshop}`}
                color="#f0b7b7"
                position={`${XEntrar} ${YEntrar} ${ZEntrar}`}
                rotation="-20 63.833 0"
                height="10" width="10" material="" geometry="height: 5" scale="0.5 0.5 0.5"
                events={{
                    click: handleClick.bind(this)
                }}>
            </Entity>
        </>
    );
}



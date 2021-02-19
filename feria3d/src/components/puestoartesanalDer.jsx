import React, { useEffect, useState } from 'react';
import 'aframe';
import { Entity } from 'aframe-react';
import {Producto}from './producto';

export const PuestoArtesanal2 = (props) => {
    const uploadUrl = 'http://localhost/';
    const urlPuesto="../img/paredes2021.glb";
    //const zlogo=(`${props.zPuesto -3}`);
    //const xlogo="-34";
    //const ylogo="8";
    
    const[productoHTML, setProductoHTML]= useState([]);
    useEffect(() => {
        if(props.productos !== undefined)
        setProductoHTML(generarProductos());
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.productos]);

    function generarProductos(){
        console.log(props);
       
        
        let htmlProd=[];
        let mesacentral=0;// contador producto principales, cantidad maxima en la mesa central

        let xC1=props.xPuesto+5;
        let yC1= props.yPuesto-0.95;
        let zC1= props.zPuesto-4;

        let ismesaC=true; // mesa central producto principal al lado 
        let contadorMesaCentral=0;
      
        
        props.productos.forEach(producto=>{
             
            if(contadorMesaCentral===2){
                contadorMesaCentral=0;
                zC1=props.zPuesto;
                xC1+=2;
            }
           

         //MESA CENTRAL + PRODUCTOS PRINCIPALES
             if(mesacentral<11 && producto.prod_principal){// maximo productos principales mesa central
                htmlProd.push(<Producto  
                    key ={producto.prod_id}
                    prod_nombre={producto.prod_nombre}
                    prod_descrip={producto.prod_descrip}
                    prod_scale ={producto.prod_scale}
                    idProducto={producto.prod_id}
                    urlProducto={uploadUrl + producto.prod_modelo3D} xM1 ={xC1} yM1={yC1} zM1={zC1} />)
                   
                if(ismesaC){
                    zC1-=3;
                    ismesaC=!ismesaC
                }else{
                    zC1+=20;
                    ismesaC= !ismesaC
                }
                contadorMesaCentral++;
            }
            
        });
        return htmlProd;
    }    
    return (
        <> 
                <a-assets>
                    <a-asset-item id="puestotex" src={`${process.env.PUBLIC_URL} ${urlPuesto}`}></a-asset-item>    
                </a-assets> 
                {productoHTML}
                <Entity 
                    key = {`${props.puestoid}`} 
                    gltf-model="#puestotex" 
                    position= {`${props.xPuesto} ${props.yPuesto} ${props.zPuesto}`} 
                    scale={`${props.prod_scale} ${props.prod_scale} ${props.prod_scale}`}
                    Rotation="0 180 0 " >
                </Entity>            
                
               
            
        </>
    );
}
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import 'aframe';
import { Entity } from 'aframe-react';
export const PuestoArtesanal3 = (props) => {
    
    const urlPuesto= process.env.PUBLIC_URL + "/img/paredesok1.glb";
     // const urlLogo="../img/logo/flooop.png";
      //const urlPorducto="../img/productos/jarro_tipo_valdivia/scene.gltf";
      //const xPuesto ="-23"; // mover en el x para cambiar de columna
      //const yPuesto ="7.5";
      //const zPuesto="96"; //mover puesto en el eje x
   /* const zlogo=(`${props.zPuesto -3}`);
    const xlogo="-34";
    const ylogo="8";
   
    */
    
    return (
        <> 
                <a-assets>
                    <a-asset-item id="puestotex" src={`${process.env.PUBLIC_URL} ${urlPuesto}`}></a-asset-item>    
                </a-assets> 

                <Entity gltf-model="#puestotex" position= {`${props.xPuesto} ${props.yPuesto} ${props.zPuesto}`} 
                scale="0.8 0.8 0.8 " rotation="0 -90 0" ></Entity>            
                
                 
               
            
        </>
    );
}
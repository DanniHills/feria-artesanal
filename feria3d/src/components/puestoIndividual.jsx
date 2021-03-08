/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import "aframe";
import { Entity, Scene } from "aframe-react";
import { Producto } from "./producto";
import PuestosService from "../services/PuestosService";
import { useParams } from "react-router-dom";
import modelo from "../assets/puesto/paredes2021.glb";
import piso from "../assets/img/Ground041_2K_Color.png";
import pisonormal from "../assets/normal/normalpiso.png";


export const PuestoArtespueanal = (props) => {
  const uploadUrl = "http://localhost/";
  //const urlPuesto = "../img/paredes2021.glb";
  const pArt_id = useParams().pArt_id;
  const [productoHTML, setProductoHTML] = useState([]);

  useEffect(() => {
    PuestosService.obtenerPuestoConProductos(pArt_id).then((res) => {
      console.log("response ", res.productos);
      setProductoHTML(generarProductos(res.productos));
    }).catch((e) => {
      console.log(e);
    });
  }, [props.productos]);
  function generarProductos() {
    let xM1 = 0;
    let yM1 = 6.048;
    let zM1 = 0;
    console.log(xM1, yM1, zM1)
    let htmlProd = [];
    let contadorMesalateral = 0; //contador mesa lateral para devolverse de der-izq
    let mesalateralCP = 0; //cantidad de productos maximo en ambas mesas laterales

    let ismesa = true;
    let mesacentral = 0; // contador producto principales, cantidad maxima en la mesa central
    let xC1 = 3;
    let yC1 =4.7; //OK
    let zC1 = 5;
    console.log( xC1, yC1, zC1);

    let ismesaC = true; // mesa central producto principal al lado
    let contadorMesaCentral = 0;
 

    props.productos.forEach((producto) => {
      if (contadorMesalateral === 4) {
        contadorMesalateral = 0;
        xM1 = xM1 + 15;
        zM1 += 3;
      }
       if (contadorMesaCentral === 2) {
         contadorMesaCentral = 0;
         xC1 = xC1 - 4.5;
         zC1 = 2;
       }
     
      if (mesalateralCP < 20 && !producto.prod_principal) {
        //colocar maximos de productos no principales en mesas laterales n
        htmlProd.push(
          <Producto
            key={producto.prod_id}
            prod_id={producto.prod_id}
            prod_nombre={producto.prod_nombre}
            prod_descrip={producto.prod_descrip}
            prod_scale={producto.prod_scale}
            pArt_id={producto.pArt_id}
            urlProducto={uploadUrl + producto.prod_modelo3D}
            xM1={xM1}
            yM1={yM1}
            zM1={zM1}
          />
        );

        if (ismesa) {
          xM1 += 2;
          ismesa = !ismesa;
        } else {
          xM1 -= 28;
          ismesa = !ismesa;
        }

        contadorMesalateral++;
      }

    if (mesacentral < 9 && producto.prod_principal) {
         // maximo productos principales mesa central
         htmlProd.push(
           <Producto
             key={producto.prod_id}
             prod_nombre={producto.prod_nombre}
             prod_descrip={producto.prod_descrip}
             prod_scale={producto.prod_scale}
             idProducto={producto.prod_id}
             pArt_id={producto.pArt_id}
             urlProducto={uploadUrl + producto.prod_modelo3D}
             xM1={xC1}
             yM1={yC1}
             zM1={zC1}
           />
         );
 
         if (ismesaC) {
           zC1 -= 3;
           ismesaC = !ismesaC;
         } else {
           zC1 -= 20;
           ismesaC = !ismesaC;
         }
         contadorMesaCentral++;
       } 
    });
    return htmlProd;
  };
  return (
    <>
      <Scene>
        <a-assets>
          <imd alt=""
            id="normal"
            src={pisonormal}
            crossOrigin=""></imd>
          <img
            alt=""
            id="sky"
            src={process.env.PUBLIC_URL + "/img/cielo.jpg"}
            crossOrigin=""
          ></img>
          <img
            alt=""
            id="groundTexture"
            src={process.env.PUBLIC_URL + "/img/2floor.jpg"}
            crossOrigin=""
          ></img>
               <img
            alt=""
            id="logo"
            src={process.env.PUBLIC_URL + "/img/logo/flooop.png"}
            crossOrigin=""
          ></img>
          <a-asset-item
            id="puestotex"
            src={modelo}
          ></a-asset-item>
          
        </a-assets>
        {productoHTML}
        <Entity
          key={`${props.puestoid}`}
          gltf-model="#puestotex"
          position="-1 5.98 0"
          scale="0.8 0.8 0.8 "
          Rotation="0 -90 0 "
        ></Entity>


        <Entity primitive="a-camera" position="1.5 7 20" rotation="-6.5 -2.8 -4.2" objeto= "clickable">
          <Entity
          
            primitive="a-cursor"
            cursor="downEvents:  ;  upEvents:  rayOrigin:  mouse"
            material={{ color: "black", shader: "flat", opacity: 4 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
          />
        </Entity>
        <Entity
          primitive="a-plane"
          src={piso}
          repeat="70 70"
          normal-map={pisonormal}
          position="0 0 0"
          rotation="-90 0 0"
          height="500"
          width="500"
        />
        <Entity primitive="a-sky" src="#sky" radius="600" />
        <Entity
           src= '#logo'
          color="pink"
          primitive="a-plane"
          position="1.035 8.692 -11.02"
          rotation=" 0 0 -180"
          scale ="2.1 -0.35 1"
          height="10"
          width="10"
         
        />
        <Entity
          primitive="a-light"
          type="ambient"
          light="color: #ffffff"
          intensity="0.88"
        />
      </Scene>
    </>
  );
};
export default PuestoArtespueanal;
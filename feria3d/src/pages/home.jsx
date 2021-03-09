import React, { useState, useEffect, useCallback } from "react";
import "aframe";
import { Entity, Scene } from "aframe-react";
import { PuestoArtesanal as PuestoArtesanalIzq } from "../components/puestoartesanalIzq";
import { PuestoArtesanal2 as PuestoArtesanalDer } from "../components/puestoartesanalDer";
import PuestosService from "../services/PuestosService";


function HomeComponent() {
  const [puestosHTML, setPuestosHTML] = useState([]);
  useEffect(() => {
    PuestosService.obtenerPuestos()
      .then((res) => {
        console.log(res);
        setPuestosHTML(generarPuestos(res));
      })
      .catch((e) => {
        console.log(e);
      });
  
  }, []);
  const generarPuestos= useCallback((puestos)=> {
    let coordxIzq = -23; //-1.41;
    let coordyIzq = 6.5; //6.048;
    let coordzIzq = 90; //0;
    let esRotado = false;
    let coordxDer = 35;
    let coordyDer = 6.5;
    let coordzDer = 86;
    let htmlP = [];
    let xEntrarI = -14.160; 
    let yEntrarI = 7.537; 
    let zEntrarI = 77.56;
    let xEntrarD = 23;
    let yEntrarD = 7.537;
    let zEntrarD = 81;

    puestos.forEach((puesto) => {
      if (!esRotado) {
        htmlP.push(
          <PuestoArtesanalIzq
            key={puesto.pArt_id}
            pArt_id={puesto.pArt_id}
            urlLogo={puesto.pArt_logo}
            xPuesto={coordxIzq}
            yPuesto={coordyIzq}
            zPuesto={coordzIzq}
            xEntrar={xEntrarI}
            yEntrar={yEntrarI}
            zEntrar={zEntrarI}
            productos={puesto.productos}
          />
        );
        coordzIzq -= 35;
        zEntrarI -= 35;
        esRotado = !esRotado;
      } else {
        htmlP.push(
          <PuestoArtesanalDer
            key={puesto.pArt_id}
            pArt_id={puesto.pArt_id}
            urlLogo={puesto.pArt_logo}
            xPuesto={coordxDer}
            yPuesto={coordyDer}
            zPuesto={coordzDer}
            productos={puesto.productos}
            xEntrar={xEntrarD}
            yEntrar={yEntrarD}
            zEntrar={zEntrarD}
          />
        );
        coordzDer -= 35;
        zEntrarD -= 35;
        esRotado = !esRotado;
      }
    });
    return htmlP;
  },[])     ;
  return (
    <>
      <Scene>
        <a-assets>
          <img
            alt=""
            id="sky"
            src={process.env.PUBLIC_URL + "/img/cielovalpo.jpg"}
            crossOrigin=""
            repeat="4 4"
          ></img>
          <img
            alt=""
            id="groundTexture"
            src={process.env.PUBLIC_URL + "/img/2floor.jpg"}
            crossOrigin=""
          ></img>
        </a-assets>
        {puestosHTML}
        <Entity
          primitive="a-plane"
          color="#a59182"
          position="0 0 0"
          rotation="-90 0 0"
          height="1000"
          width="1000"
        />
        <Entity primitive="a-sky" src="#sky" radius="600" />

        <Entity
          primitive="a-light"
          type="ambient"
          light="color: #ffffff"
          intensity="0.8"
        />

        <Entity primitive="a-camera" position="6.9 6.9 122"   camera="" rotation="" look-controls="" wasd-controls="" data-aframe-inspector-original-camera="">         
          <Entity
          raycaster=""
            primitive="a-cursor"
            cursor="downEvents:  ;  upEvents:  ;rayOrigin:  mouse"
            material={{ color: "black", shader: "flat", opacity: 4 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
          />
        </Entity>
      </Scene>
    </>
  );
}
export default HomeComponent;

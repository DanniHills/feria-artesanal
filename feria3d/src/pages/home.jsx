import React, { useState, useEffect } from "react";
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
  function generarPuestos(puestos) {
    let coordX = -23; //-1.41;
    let coordY = 6.5; //6.048;
    let coordZ = 90; //0;
    let esRotado = false;
    let coordxDer = +35;
    let coordyDer = 6.5;
    let coordzDer = 86;
    let htmlP = [];
    let xEntrarI=-9.6;
    let yEntrarI=2.4;
    let zEntrarI=79;
    let xEntrarD=21;
    let yEntrarD=2.4;
    let zEntrarD=75.86;
    console.log('der:'+coordxDer, coordyDer, coordzDer);
    console.log('izq:'+coordX, coordY, coordZ);
    puestos.forEach((puesto) => {
      if (!esRotado) {
        htmlP.push(
          <PuestoArtesanalIzq
            key={puesto.pArt_id}
            pArt_id={puesto.pArt_id}
            urlLogo={puesto.pArt_logo}
            xPuesto={coordX}
            yPuesto={coordY}
            zPuesto={coordZ}
            xEntrar={xEntrarI}
            yEntrar={yEntrarI}
            zEntrar={zEntrarI}
            productos={puesto.productos}
          />
        );
        coordZ -= 35;
        zEntrarI-=35;
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
  }
  /*const handleClick = () => {
    console.log("Clicked!");
  };
  const handleCollide = () => {
    console.log("Collided!");
  };*/
  return (
    <>
      <Scene>
        <a-assets>
          <img
            alt=""
            id="sky"
            src={process.env.PUBLIC_URL + "/img/cielovalpo.jpg"}
            crossOrigin=""
            repeat= "4 4"
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

        <Entity primitive="a-camera" position="6.9 6.9 122">
          <Entity
            primitive="a-cursor"
            cursor="downEvents:  ;  upEvents:  ;"
            material={{ color: "black", shader: "flat", opacity: 4 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
          />
        </Entity>
      </Scene>
    </>
  );
}
export default HomeComponent;

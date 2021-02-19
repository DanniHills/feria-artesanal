import React, { useState, useEffect } from "react";
import "aframe";
import { Entity, Scene } from "aframe-react";
import { PuestoArtesanal as PuestoArtesanalIzq } from "../components/puestoartesanalIzq";
import { PuestoArtesanal2 as PuestoArtesanalDer } from "../components/puestoartesanalDer";
import PuestosService from "../services/PuestosService";
//import { PuestoArtesanal3} from '../components/puesto3'

function HomeComponent() {
  const [puestosHTML, setPuestosHTML] = useState([]);
  useEffect(() => {
    PuestosService.obtenerPuestos()
      .then((res) => {
        console.log(res);
        // setPuestos(res);
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

    puestos.forEach((puesto) => {
      if (!esRotado) {
        htmlP.push(
          <PuestoArtesanalIzq
            key={puesto.pArt_id}
            urlLogo={puesto.pArt_logo}
            xPuesto={coordX}
            yPuesto={coordY}
            zPuesto={coordZ}
            productos={puesto.productos}
          />
        );
        coordZ -= 35;
        esRotado = !esRotado;
      } else {
        htmlP.push(
          <PuestoArtesanalDer
            key={puesto.pArt_id}
            urlLogo={puesto.pArt_logo}
            xPuesto={coordxDer}
            yPuesto={coordyDer}
            zPuesto={coordzDer}
            productos={puesto.productos}
          />
        );
        coordzDer -= 35;

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
            src={process.env.PUBLIC_URL + "/img/cielo.jpg"}
            crossOrigin=""
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
          intensity="0.88"
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

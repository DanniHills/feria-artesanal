import React, { useEffect, useState } from "react";
import { Row, Col, Tooltip } from 'antd';

function MapaComponent() {
    
    const [PuestosContainer , setPuestosContainer] = useState();
    const [CameraPosition, setCameraPosition] = useState("6.30 6.90 100.00");
    const faceCameraToCoords = (camera, coords) => {
        camera.setAttribute("look-controls",{enabled:false})
        camera.setAttribute("rotation", coords);
        camera.components['look-controls'].pitchObject.rotation.x = camera.object3D.rotation.x;
        camera.components['look-controls'].yawObject.rotation.y = camera.object3D.rotation.y;
        camera.setAttribute("look-controls",{enabled:true})
    }
    
    const visitarPuesto = (puesto_id) => {
        
        let puestoSplit = puesto_id.split('-');
        let puestoPosition = document.getElementById(puesto_id).getAttribute('position').split(' ');
        let cameraPosition = {
            x: 6.33, //para que quede al centro del "pasillo"
            y: puestoPosition[1] ,
            z: puestoPosition[2]
        };
        document.getElementById('aframe-camara').setAttribute('position', cameraPosition);
        if(puestoSplit[1] === 'izq'){
            faceCameraToCoords(document.getElementById('aframe-camara'), {x:0, y:90, z:0});
        }else{
            faceCameraToCoords(document.getElementById('aframe-camara'), {x:0, y:270, z:0});
        }
        moverCursor(cameraPosition, puestoSplit[1]);
    }
    //POSICION INICIAL CAMARA
    //position="6.3 6.9 100"
   
    const bloquearCamara = (pos) => {
        console.log(pos);
        //no deja ir a la izquierda
        if(parseFloat(pos.x) <= -10){
            document.getElementById('aframe-camara').setAttribute('position', {x:-10 ,y:pos.y, z:pos.z});
        }


        //no deja ir a la derecha
        if(parseFloat(pos.x) >= 20){
            document.getElementById('aframe-camara').setAttribute('position', {x:20 ,y:pos.y, z:pos.z});
        }

        //no deja retroceder
        if(parseFloat(pos.z) >= 100){
            document.getElementById('aframe-camara').setAttribute('position', {x:pos.x ,y:pos.y, z:100});
        }

        /*devolverse al comienzo
        if(parseFloat(pos.z) <= 0){
            document.getElementById('aframe-camara').setAttribute('position', {x:pos.x ,y:pos.y, z:100});
        }*/
    }

    const moverCursor = (pos, dir) => {
        //en eje x se mueve entre 0 y 90px
        //en eye y se mueve entre 0 y 60px
        let cursor = document.getElementById('position-cursor');
        if(dir === 'izq'){
            cursor.style.top = '-15px';
        }
        if(dir === 'der'){
            cursor.style.top = '40px';
        }
        if(dir === undefined){
            cursor.style.top = (pos.x * 2) + 'px';
        }
        cursor.style.left = (90 - pos.z)*0.8 + 'px';
    }

    useEffect(() => {
        document.addEventListener('keypress', function(event) {
            document.querySelectorAll('.listenonkey').forEach(function(obj){
                let pos = document.getElementById('aframe-camara').getAttribute('position');

                bloquearCamara(pos);

                moverCursor(pos);
                

                //string para mostrar
                pos = parseFloat(pos.x).toFixed(2) + ' ' + parseFloat(pos.y).toFixed(2) + ' ' + parseFloat(pos.z).toFixed(2);
                //pos = parseInt(pos.x) + ' ' + parseInt(pos.y) + ' ' + parseInt(pos.z);
                setCameraPosition(pos);
                
            });
          });
    
        let pids_izquierda = [];
        let pids_derecha = [];
        let nodosPuestos = document.querySelectorAll('.puestosArtesanales');
        //console.log('puestos',p);
        nodosPuestos.forEach(nodo => {
            //console.log(nodo.id);
            let direccion = nodo.id.split('-')[1];
            if(direccion === 'izq'){
                pids_izquierda.push(
                    <Tooltip  title={nodo.getAttribute('name')}>
                        <div style={{marginRight: '15px', width: '15px', height: '15px', backgroundColor: 'white', borderRadius:4}} onClick={() => visitarPuesto(nodo.id)} />
                    </Tooltip>
                );
            }else{
                pids_derecha.push(
                    <Tooltip  title={nodo.getAttribute('name')}>
                        <div style={{marginRight: '15px', width: '15px', height: '15px', backgroundColor: 'white', borderRadius:4}} onClick={() => visitarPuesto(nodo.id)} />
                    </Tooltip>
                );
            }
            
        });
        setPuestosContainer(<div>
            <Row>
                {pids_izquierda}
            </Row>
            <Row style={{height: 60, marginTop: 20}}>
                <div id="position-cursor" style={{position: 'relative', top:'13px', left:'0px', width: 15, height: 15, backgroundColor: 'white', borderRadius: 100, padding:2}}>
                    <div style={{width:11, height:11, backgroundColor:'red', borderRadius: 100}}></div>
                </div>
            </Row>
            <Row>
                {pids_derecha}
            </Row>
        </div>);
        //setPuestosButtons(pids);
    }, []);

    return (
        <div style={{ position: 'fixed', top: 100, right: 30, width: 300, height: 200,padding: 15, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10, zIndex: 999 }}>
            <Row>
                <Col span={24} style={{color: 'white', marginBottom: 10}}>
                    Mapa puestos artesanales <small>(Clickea un puesto para moverte)</small>
                </Col>
                <Col span={24}>
                    {PuestosContainer}
                </Col>
            </Row>
        </div>
    );
}
export default MapaComponent;

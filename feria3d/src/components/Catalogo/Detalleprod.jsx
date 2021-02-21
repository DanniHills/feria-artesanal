import React, { useEffect, useState } from "react";
import {  Row, Col, Descriptions, Button } from "antd";
import CatalogoService from "../../services/CatalogoService";
import { Link, useParams } from "react-router-dom";
import '@google/model-viewer';
//import ArtesanoService from "../../services/artesanoService";

        
function DetalleProd() {
  const prod_id = useParams().prod_id;
  const uploadsUrl = 'http://localhost/';
  const [producto, setProducto] = useState(null);
  //const artesanoService = new ArtesanoService();
  //const [artesano, setArtesano] = useState(null);
  useEffect(() => {
    CatalogoService.detalleProducto(prod_id)
      .then((res) => {
       setProducto( res) ;
      })
      .catch((e) => {
        console.log(e);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

 /* useEffect(() => {
 
    artesanoService.buscarartesanodelpuesto('1')
      .then((res) => {
       setArtesano( res) ;
       console.log(res);

      })
      .catch((e) => {
        console.log(e);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log('prod'+ producto);

  console.log('artt'+ artesano.res  );*/
  return (
  
    <>
      <Row style={{padding: 30}} justify="start" align="top">
        <Col span={24}><h1 style={{fontSize: 25}}>Detalle Producto</h1></Col>

        { producto && (
          
        <Col style={{marginTop: 30}} span={24}>
          <Row gutter={16}>
            <Col span={12}>
                <model-viewer 
                style={{width: '100%', height: '500px'}} 
                id="reveal" 
                loading="eager" 
                camera-controls 
                auto-rotate 
                poster={uploadsUrl + producto.prod_imagen} 
                src={uploadsUrl + producto.prod_modelo3D} 
                alt="A 3D model of a shishkebab"
                />
            </Col>        
            <Col span={12}>
                <Descriptions bordered>
                    <Descriptions.Item label={'Nombre: ' + producto.prod_nombre} span={6}> </Descriptions.Item>
                    <Descriptions.Item label={'Descripción: ' + producto.prod_descrip} span={6}> </Descriptions.Item>
                    <Descriptions.Item label = {'puesto: '+ producto.pArt_id} span={6}></Descriptions.Item>
                    <Descriptions.Item label={'Información de Contacto'} span={6}> </Descriptions.Item>
                    <Descriptions.Item label={'Artesano:'  } span={6}> </Descriptions.Item>
                    <Descriptions.Item label={'Telefono: 945677654' } span={6}> </Descriptions.Item>
                    <Descriptions.Item label={'Correo: toro@gmail.com' } span={6}> </Descriptions.Item>
                </Descriptions>
                
                 < Link to={"/Catalogo" } justify ="end"><Button type="primary" >Volver al Catátalogo</Button></Link>
               
                
            </Col>   
          </Row>
        </Col>
        )}
      </Row>
    </>
  );
}

export default DetalleProd;

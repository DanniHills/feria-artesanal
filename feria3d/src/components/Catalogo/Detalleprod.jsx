import React, { useEffect, useState } from "react";
import { Row, Col, Button, List,  Card } from "antd";
import CatalogoService from "../../services/CatalogoService";
import { Link, useParams } from "react-router-dom";
import '@google/model-viewer';
import ArtesanoService from "../../services/artesanoService";
import Text from "antd/lib/typography/Text";


function DetalleProd() {
  const prod_id = useParams().prod_id;
  const uploadsUrl = 'http://localhost/';
  const [producto, setProducto] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const artesanoService = new ArtesanoService();
  const [informacion, setInformacion] = useState(null);
  
  useEffect(() => {
    CatalogoService.detalleProducto(prod_id)
      .then((res) => {
        setProducto(res);
      })
      .catch((e) => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    artesanoService.informacionProductoArtesano(prod_id).then((res) => {
      setInformacion(res);
    }).catch((e) => {
      console.log(e);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <>
      <Row style={{ padding: 30 }} justify="start" align="top">
        <Col span={24}><h1 style={{ fontSize: 25 }}>Detalle Producto</h1></Col>

        {producto && informacion && (

          <Col style={{ marginTop: 30 }} span={24}>
            <Row gutter={16}>
              <Col lg={12} md={24} sm={24} xs={24}>
                <model-viewer
                  style={{ width: '100%', height: '500px' }}
                  id="reveal"
                  loading="eager"
                  camera-controls
                  auto-rotate
                  poster={uploadsUrl + producto.prod_imagen}
                  src={uploadsUrl + producto.prod_modelo3D}
                  alt="A 3D model of a shishkebab"
                />
              </Col>
              <Col  lg={12} md={24} sm={24} xs={24} >
                <Card style={{padding:0}}>
                <List bordered  style={{margin:0}}
                >
                  <List.Item style={{textAlign:"center"}}> <Text strong>Información de Producto </Text></List.Item>
                  <List.Item >Nombre:  {producto.prod_nombre} </List.Item>
                  <List.Item >Descripción: {producto.prod_descrip } </List.Item>
                  <List.Item >Puesto Artesanal: {producto.pArt_id}</List.Item>
                  <List.Item style={{textAlign:"center"}}> <Text strong>Información de Contacto </Text></List.Item>
                  <List.Item >Artesano:  { informacion.art_nombre }  {informacion.art_apellido} </List.Item>
                  <List.Item >Telefono: {informacion.art_fono} </List.Item>
                  <List.Item >Correo:{ informacion.art_correo} </List.Item>
                </List>
                </Card>
                <Col span={24} style={{textAlign:"center", marginTop:25}}>
                < Link to={"/Catalogo"}  ><Button type="primary" >Volver al Catátalogo</Button></Link>
                </Col>

              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </>
  );
}

export default DetalleProd;

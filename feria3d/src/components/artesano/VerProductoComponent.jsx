import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  List,
  Button,
  Card,
} from "antd";
import CatalogoService from "../../services/CatalogoService";
import { Link, useParams } from "react-router-dom";
import "@google/model-viewer";

import EditarComponent from "../artesano/editarComponent";
import Text from "antd/lib/typography/Text";

function VerProductoComponent() {

  const prod_id = useParams().prod_id;
  console.log(prod_id);
  const uploadsUrl = "http://localhost/";
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    CatalogoService.detalleProducto(prod_id)
      .then((res) => {
        console.log(res);
        // setPuestos(res);
        setProducto(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <Row style={{ padding: 30 }} justify="start" align="top">
        <Col span={24}>
          <h1 style={{ fontSize: 25 }}> Producto</h1>
        </Col>
        {producto && (
          <Col style={{ marginTop: 30 }} span={24}>
            <Row gutter={24}>
              <Col lg={10} md={24} sm={24} xs={24} style={{marginBottom:25}}>
                <model-viewer
                  style={{ width: "100%", height: "100" }}
                  id="reveal"
                  loading="eager"
                  camera-controls
                  auto-rotate
                  poster={uploadsUrl + producto.prod_imagen}
                  src={uploadsUrl + producto.prod_modelo3D}
                  alt="A 3D model of a shishkebab"
                />
              </Col>
              <Col lg={12} md={24} sm={24} xs={24}  >
                <Card>
                  <List bordered>
                    <List.Item style={{ textAlign: "center" }}> <Text strong  underline>Información de Producto </Text></List.Item>
                    <List.Item>Nombre: {producto.prod_nombre}</List.Item>
                    <List.Item>Descripción:{producto.prod_descrip}</List.Item>
                    <List.Item>Principal: {(producto.prod_principal ? '  Si' : '  No')}</List.Item>
                  </List>
                </Card>
               
              </Col>
              <Col span={24} style={{ textAlign: "center", marginTop: 25 }}>
                  <EditarComponent />
                  <Link to={"/artesano/buscarProducto"}>
                    <Button type="primary">Volver</Button>
                  </Link>
                </Col>
            </Row>
          </Col>
        )}
      </Row>
    </>
  );
}
export default VerProductoComponent;

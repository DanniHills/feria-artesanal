import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Descriptions,
  Button,
} from "antd";
import CatalogoService from "../../services/CatalogoService";
import { Link, useParams } from "react-router-dom";
import "@google/model-viewer";

import EditarComponent from "../artesano/editarComponent";

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
            <Row gutter={16}>
              <Col span={12}>
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
              <Col span={12}>
                <Descriptions bordered>
                  <Descriptions.Item
                    label={"Nombre: " + producto.prod_nombre}
                    span={6}
                  >
                    {" "}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Descripción: " + producto.prod_descrip}
                    span={6}
                  >
                    {" "}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Principal:" + (producto.prod_principal? '  Si':'  No')}
                    span={6}
                  >
                    {" "}
                  </Descriptions.Item>
                </Descriptions>
                <EditarComponent/>  
                <Link to={"/artesano/buscarProducto"} justify="end">
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

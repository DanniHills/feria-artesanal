import React from "react";
import { Col, Row, Card } from "antd";
import SessionService from "../../services/SessionService";
import Meta from "antd/lib/card/Meta";


const sessionService = new SessionService();

function InicioComponent() {

  const user = sessionService.getUserData();

  if (user.tipo === 'Administrador') {
    user.nombre = user.admin_nombre;
    user.apellido = user.admin_apellido;
    user.correo = user.admin_correo;
  }
  if (user.tipo === 'Artesano') {
    user.nombre = user.art_nombre;
    user.apellido = user.art_apellido;
    user.correo = user.art_correo;
  }
  return (
    <>
      <Col span={8} offset={2} ><h1 style={{ fontSize: 30 }}>Información personal</h1></Col>
      <Row style={{ minHeight: "100%", padding: 40 }} justify="center" >
        <Col xs={24} lg={8}>
          <img
            className="imgperfil"
            src={process.env.PUBLIC_URL + '/img/imgDefect.png'}
            alt="foto"
            width={200}
            Align="end" />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} style= {{ marginTop:25}}>
          <Card>
            <Meta description={`Nombre: ${user.nombre}`} > </Meta> <br/>
            <Meta description={`Apellido: ${user.apellido}`} > </Meta><br/>
            <Meta description={`Correo: ${user.correo}`}> </Meta><br/>
           
            </Card>
        </Col>
      </Row>
    </>
  );
}
export default InicioComponent;

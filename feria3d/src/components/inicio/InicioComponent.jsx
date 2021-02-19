import React from "react";
import { Col, Row, Descriptions } from "antd";
import SessionService from "../../services/SessionService";


const sessionService = new SessionService();

function InicioComponent() {
  
  const user = sessionService.getUserData();

  if(user.tipo === 'Administrador'){
    user.nombre = user.admin_nombre;
    user.apellido = user.admin_apellido;
    user.correo = user.admin_correo;
  }
  if(user.tipo === 'Artesano'){
    user.nombre = user.art_nombre;
    user.apellido = user.art_apellido;
    user.correo = user.art_correo;
  }
  return (
    <>
    <Col span={8} offset= {2} ><h1 style={{fontSize: 30}}>Información personal</h1></Col> 
    <Row style={{ minHeight: "100%", padding:40}} justify="end" align="top">
   
    <Col span={8} >
    <img
                className="imgperfil"
                src={process.env.PUBLIC_URL + '/img/imgDefect.png'}
                alt="foto"
                width={200}
                Align = "Middle"/>
    </Col>
    <Col span={16}>
       <Descriptions bordered>
        <Descriptions.Item label={`Nombre: ${user.nombre}`}span={6}> </Descriptions.Item>
        <Descriptions.Item label={`Apellido: ${user.apellido}`} span={6}> </Descriptions.Item>
        <Descriptions.Item label={`Correo: ${user.correo}`} span={6}> </Descriptions.Item>
      </Descriptions>
      </Col>
    </Row>  
    </>   
  );
  }
export default InicioComponent;

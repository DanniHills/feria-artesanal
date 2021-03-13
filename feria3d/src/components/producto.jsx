/* esLint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import 'aframe';
import { Entity } from 'aframe-react';
import { Modal, Col, Card, List, Row } from 'antd';
import '@google/model-viewer';
import ArtesanoService from '../services/artesanoService';
import Text from 'antd/lib/typography/Text';
export const Producto = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    //const uploadsUrl = 'http://localhost/';
    const [informacion, setInformacion]=useState([]);
    const artesanoService= new ArtesanoService();
    
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
      console.log('eliminando con ok');
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      console.log('eliminando con cancel');
    };
    const handleClick = () => {
      console.log('Clicked!');
      showModal();
    } 
console.log('id: ',props.prod_id);
    useEffect(()=>{
      artesanoService.informacionProductoArtesano(props.prod_id).then((res) => {
        console.log(res);
        setInformacion(res);
      }).catch((e) => {
        console.log(e);
      });
    }, []);

    return (
        <>  
            <Entity 
                gltf-model={process.env.PUBLIC_URL + props.urlProducto}
                position= {`${props.xM1} ${props.yM1} ${props.zM1}`} 
                scale ={`${props.prod_scale} ${props.prod_scale} ${props.prod_scale}`}
                events={{
                    click: handleClick.bind(this)
                  }}
            />            
            {informacion &&(
            <Modal 
                width={700}
                style={{padding:0}}
                title={informacion.prod_nombre} 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            > 
            <Row>
              <Col  lg={12} md={24} sm={24} xs={24}>
              <model-viewer 
                    style={{width: '100%', height: '300px'}} 
                    id="reveal" 
                    loading="eager" 
                    camera-controls 
                    auto-rotate 
                    src={props.urlProducto} 
                    alt=" "
                />
              </Col>
              <Col  lg={12} md={24} sm={24} xs={24}>
              <Card style={{padding:0}}>
                <List bordered  style={{margin:0}}
                >
                  <List.Item style={{textAlign:"center"}}> <Text strong>Información de Producto </Text></List.Item>
                  <List.Item >Nombre: {informacion.prod_nombre } </List.Item>
                  <List.Item >Descripción: {informacion.prod_descrip } </List.Item>
                  <List.Item >Puesto Artesanal: {informacion.pArt_id}</List.Item>
                  <List.Item style={{textAlign:"center"}}> <Text strong>Información de Contacto </Text></List.Item>
                  <List.Item >Artesano:  { informacion.art_nombre }  {informacion.art_apellido} </List.Item>
                  <List.Item >Telefono: {informacion.art_fono} </List.Item>
                  <List.Item >Correo:{ informacion.art_correo} </List.Item>
                </List>
                </Card>
              </Col>
            </Row>   
            </Modal>)}
        </>
    );
}
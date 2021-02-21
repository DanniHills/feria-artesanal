/* esLint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import 'aframe';
import { Entity } from 'aframe-react';
import { Modal, Descriptions } from 'antd';
import '@google/model-viewer';
import ArtesanoService from '../services/artesanoService';
import { useParams } from 'react-router-dom';
export const Producto = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    //const uploadsUrl = 'http://localhost/';
    const [informacion, setInformacion]=useState([]);
    const artesanoService= new ArtesanoService();
    const []= useState([]);
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
console.log('id: '+props.prod_id);
    useEffect(()=>{
      artesanoService.informacionProductoArtesano(props.prod_id).then((res) => {
        console.log(res);
        setInformacion(res);
      }).catch((e) => {
        console.log(e);
      });
    }, [props.productos]);

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
                title={informacion.prod_nombre} 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            > 
            
                <p>{informacion.prod_descrip}</p>
                <model-viewer 
                    style={{width: '100%', height: '300px'}} 
                    id="reveal" 
                    loading="eager" 
                    camera-controls 
                    auto-rotate 
                    src={props.urlProducto} 
                    alt="A 3D model of a shishkebab"
                />
                 <Descriptions >
                    <Descriptions.Item label={'Información de Contacto'} span={6}> </Descriptions.Item>
                    <Descriptions.Item label={'Artesano '}  span={6}> {informacion.art_nombre} {informacion.art_apellido}</Descriptions.Item>
                    <Descriptions.Item label={'Telefono ' }span={6}>{informacion.art_fono}</Descriptions.Item>
                    <Descriptions.Item label={'Correo'}span={6}> {informacion.art_correo}</Descriptions.Item>
                </Descriptions>
            </Modal>)}
        </>
    );
}
/* esLint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import 'aframe';
import { Entity } from 'aframe-react';
import { Modal, Descriptions } from 'antd';
import '@google/model-viewer';
export const Producto = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const uploadsUrl = 'http://localhost/';

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
            
            <Modal 
                title={props.prod_nombre} 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            > 
            
                <p>{props.prod_descrip}</p>
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
                    <Descriptions.Item label={'Artesano ' } span={6}> Héctor Toro</Descriptions.Item>
                    <Descriptions.Item label={'Telefono' } span={6}>  945677654 </Descriptions.Item>
                    <Descriptions.Item label={'Correo' } span={6}>  toro@gmail.com </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
}
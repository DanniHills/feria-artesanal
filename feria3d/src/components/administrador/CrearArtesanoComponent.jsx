import React, { useState } from 'react';
import { Form, Input, Button, Col, Row, message } from 'antd';
import AdministradorService from '../../services/administradorService';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const administradorService = new AdministradorService();

function CrearArtesanoComponent() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
    const onFinish = artesano => {
      setLoading(true);
      console.log('Received values of form: ', artesano);
      administradorService.crearArtesano(artesano)
      .then(response => {
        if(response.status === 200){
          message.success(response.message);
          form.resetFields();
          setLoading(false);
        }else{
          message.error(response.message);
          setLoading(false);
        }
      })
      .catch(err => {
        message.error('Error de conexión con el servidor.');
        setLoading(false);
      });      
    };
    return (
        <Row style={{minHeight: '100%', padding: 30}} justify="center" align="top">
          <Col span={24}><h1 style={{fontSize: 25}}>Crear Artesano</h1></Col>
          <Col lg={8 } md={24} sm={24} xs={24}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                remember: true,
              }}
            >
            <Form.Item
              name="art_nombre"
              rules={[{ required: true, message: 'Debes ingresar el nombre.' }]} 
              label="Nombre"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="art_apellido"
              rules={[{ required: true, message: 'Debes ingresar el apellido.' }]} 
              label="Apellidos"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="art_rut"
              rules={[{ required: true, message: 'Indica el rut del artesano.' }]} 
              label="Rut"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="art_fono"
              rules={[{ required: true, message: 'Indica el número telefónico del artesano.' }]} 
              label="Teléfono"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="art_correo"
              rules={[{ required: true, type: 'email', message: 'Debes ingresar el correo electrónico.' }]} 
              label="Correo electrónico"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="art_pwd"
              rules={[{ required: true, message: 'Indica una contraseña para el usuario.' }]} 
              label="Contraseña"
            ><Input.Password
            placeholder="input password"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
             
            </Form.Item>
            <Form.Item>
              <Button disabled={loading} loading={loading} type="primary" htmlType="submit" >
                Crear artesano
              </Button>
            </Form.Item>
          </Form>
          </Col>
        </Row>
  );
}

export default CrearArtesanoComponent;
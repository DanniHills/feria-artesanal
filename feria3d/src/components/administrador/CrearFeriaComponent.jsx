
import React, { useState } from 'react';
import { Form, Input, Button, Col, Row, message } from 'antd';
import AdministradorService from '../../services/administradorService';
const administradorService = new AdministradorService();
const {TextArea} =Input;
function CrearFeriaComponent() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
    const onFinish = feria => {
      setLoading(true);
      console.log('Received values of form: ', feria);
      administradorService.crearFeria(feria)
      .then(response => {
        if(response.status === 200){
          message.success('Feria Artesanal creada correctamente');
          form.resetFields();
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
          <Col span={24}><h1 style={{fontSize: 25}}>Crear Feria Artesanal</h1></Col>
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
              name="feria_nombre"
              rules={[{ required: true, message: 'Debes ingresar el nombre de la feria.' }]} 
              label="Nombre de la Feria Artesanal"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="feria_descrip"
              rules={[{ required: true, message: 'Debes ingresar la descripción de la feria.' }]} 
              label="Descripción"
            ><TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button disabled={loading} loading={loading} type="primary" htmlType="submit">
                Crear Feria
              </Button>
            </Form.Item>
          </Form>
          </Col>
        </Row>
  );
}

export default CrearFeriaComponent;
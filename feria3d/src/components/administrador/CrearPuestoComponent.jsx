import React, { useEffect, useState } from "react";
import { Form, Input, Button, Col, Row, message, Select } from "antd";
import AdministradorService from "../../services/administradorService";
import TecnicaService from "../../services/TecnicaService";

const administradorService = new AdministradorService();
const tecnicaService = new TecnicaService();

const { TextArea } = Input;

function CrearPuestoComponent() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [artesano, setArtesano] = useState([]);
  const [tecnica, setTecnica] = useState([]);
  const [feria, setFeria] = useState([]);
  const { Option } = Select;

  const onFinish = (puesto) => {
    setLoading(true);
  
    let formulario = new FormData();
    formulario.append("feria_id", puesto.feria_id);
    formulario.append("art_id", puesto.art_id);
    formulario.append("tec_id", puesto.tec_id);
    formulario.append("pArt_nombre", puesto.pArt_nombre);
    formulario.append("pArt_descrip", puesto.pArt_descrip);
    formulario.append("pArt_std", puesto.pArt_std);
    //formulario.append("pArt_logo", archivoImagen[0]);
    formulario.append("pArt_ubicación",puesto.pArt_ubicación );

    console.log("Received values of form: ", formulario);
    administradorService
      .crearPuesto(formulario)
      .then((response) => {
        if (response.status === 500) {
          message.error("Ocurrió un error al crear puesto artesanal.");
          setLoading(false);
          return;
        }
        message.success("Puesto artesanal creado correctamente");
        form.resetFields();
        setLoading(false);
      })
      .catch((err) => {
        message.error("Error de conexión con el servidor.");
        setLoading(false);
      });
  };


  useEffect(() => {
    administradorService.buscarArtesanos().then((response) => {
      let art = [];
      response.forEach((artesano, index) => {
        art.push(
          <Option key={index} value={artesano.art_id}>
            {artesano.art_nombre}
            {"\n"}
            {artesano.art_apellido}
          </Option>
        );
      });
      setArtesano(art);
    });
  }, []);
  useEffect(() => {
    tecnicaService.buscarTecnicas().then((response) => {
      let tec = [];
      response.forEach((tecnica, index) => {
        tec.push(
          <Option key={index} value={tecnica.tec_id}>
            {tecnica.tec_nombre}
          </Option>
        );
      });
      setTecnica(tec);
    });
  }, []);

  useEffect(() => {
    administradorService.buscarFeria().then((response) => {
      let fer = [];
      response.forEach((feria, index) => {
        fer.push(
          <Option key={index} value={feria.feria_id}>
            {feria.feria_nombre}
          </Option>
        );
      });
      setFeria(fer);
    });
  }, []);
  return (
    <Row
      style={{ minHeight: "100%", padding: 30 }}
      justify="center"
      align="top"
    >
      <Col span={24}>
        <h1 style={{ fontSize: 25 }}>Crear Puesto Artesanal</h1>
      </Col>
      <Col span={7}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="pArt_nombre"
            rules={[
              {
                required: true,
                message: "Debes ingresar el nombre de la Puesto Artesanal.",
              },
            ]}
            label="Nombre del   Puesto Artesanal"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="pArt_descrip"
            rules={[
              {
                required: true,
                message: "Debes ingresar la descripción del Puesto Artesanal.",
              },
            ]}
            label="Descripción"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="art_id"
            rules={[
              { required: true, message: "Indica el artesano que administra" },
            ]}
            label="Artesano"
          >
            <Select style={{ width: "100%" }}>{artesano}</Select>
          </Form.Item>
          <Form.Item
            name="tec_id"
            rules={[
              {
                required: true,
                message: "Indica la técnica del puesto artesanal",
              },
            ]}
            label="Técnica"
          >
          <Select style={{ width: "100%" }}>{tecnica}</Select>
          </Form.Item>
          <Form.Item
            name="feria_id"
            rules={[
              {
                required: true,
                message: "Indique a que feria artesanal pertenece",
              },
            ]}
            label="Feria artesanal"
          >
            <Select style={{ width: "100%" }}>{feria}</Select>
          </Form.Item>
          <Form.Item>
            <Button
              disabled={loading}
              loading={loading}
              type="primary"
              htmlType="submit"
            >
              Crear Puesto
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

export default CrearPuestoComponent;

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Col, Row, message, Upload, Checkbox, Select, InputNumber} from "antd";
import FormData from "form-data";
import ArtesanoService from "../../services/artesanoService";
import { InboxOutlined } from "@ant-design/icons";
import MaterialService from "../../services/MaterialService";
import PuestosService from "../../services/PuestosService";
import SessionService from "../../services/SessionService";

const sessionService = new SessionService();
const artesanoService = new ArtesanoService();
const materialesService = new MaterialService();
const puestosService = new PuestosService();
const { TextArea } = Input;

function CrearProductoComponent() {
  const { Dragger } = Upload;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [archivoImagen, setArchivoImagen] = useState([]);
  const [archivoModelo, setArchivoModelo] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [puestoArtesanal, setPuestoArtesanal] = useState([]);
  const [principal, setPrincipal] = useState(0);
  useEffect(() => {
    materialesService.buscarMateriales().then((response) => {
      let mat = [];
      response.forEach((material, index) => {
        mat.push(
          <Option key={index} value={material.mat_id}>
            {material.mat_nombre}
          </Option>
        );
      });
      setMateriales(mat);
    });
  }, []);

  useEffect(() => {
    puestosService.buscarPuestosArtesanoId(sessionService.getUserData().art_id).then((response) => {
      let pArt = [];
      response.forEach((puesto, index) => {
        pArt.push(
          <Option key={index} value={puesto.pArt_id}>
            {puesto.pArt_nombre}
          </Option>
        );
      });
      setPuestoArtesanal(pArt);
    });
  }, []);

  const onFinish = (producto) => {
    setLoading(true);
    let formulario = new FormData();
    formulario.append("prod_nombre", producto.prod_nombre);
    formulario.append("mat_id", [producto.mat_id]);
    formulario.append("pArt_id", producto.pArt_id);
    formulario.append("prod_descrip", producto.prod_descrip);
    formulario.append("prod_principal", principal);
    formulario.append("prod_ubicacion", producto.prod_ubicacion);
    formulario.append("prod_scale", producto.prod_scale);
    formulario.append("prod_imagen", archivoImagen[0]);
    formulario.append("prod_modelo", archivoModelo[0]);

console.log("Datos",formulario);
console.log("dato", producto) ;
artesanoService
      .crearProducto(formulario)
      .then((response) => {
        console.log(response);
        if (response.status === 500) {
          message.error("Ocurrió un error al agregar producto.");
          setLoading(false);
          return;
        }
        message.success("Producto creado correctamente");
        setArchivoImagen([]);
        setArchivoModelo([]);
        form.resetFields();
        setLoading(false);
      })
      .catch((err) => {
        message.error("Error de conexión con el servidor.");
        setLoading(false);
      });
  };

  const eliminarArchivoImagen = (file) => {
    setArchivoImagen([]);
    console.log("onremovefile");
  };
  const agregarArchivoImagen = (file) => {
    setArchivoImagen([file]);
    return false;
  };

  const eliminarArchivoModelo = (file) => {
    setArchivoModelo([]);
    console.log("onremovefile");
  };
  const agregarArchivoModelo = (file) => {
    setArchivoModelo([file]);
    return false;
  };

  function onChange(e) {
    setPrincipal(e.target.checked ? 1 : 0);
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <Row style={{ padding: 30 }} justify="center" align="top">
      <Col span={24}>
        <h1 style={{ fontSize: 25 }}>Crear Producto</h1>
      </Col>
      <Col span={12}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            remember: true,
          }}
        >
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="prod_nombre"
                rules={[
                  { required: true, message: "Debes ingresar el nombre." },
                ]}
                label="Nombre"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="pArt_id"
                rules={[
                  {
                    required: true,
                    message: "Indica el puesto donde se agregará.",
                  },
                ]}
                label="Puesto artesanal"
              >
                <Select mode="" allowClear style={{ width: "100%" }}>
                  {puestoArtesanal}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="mat_id"
                rules={[
                  {
                    required: true,
                    message: "Indica el material del producto.",
                  },
                ]}
                label="Material"
              >
                <Select mode="multiple" allowClear style={{ width: "100%" }}>
                  {materiales}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="prod_descrip"
                rules={[
                  { required: true, message: "Debes ingresar descripción." },
                ]}
                label="Descripción"
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="prod_principal">
                <Checkbox onChange={onChange}>Producto principal</Checkbox>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="prod_scale"
                rules={[{ required: true, message: "Debes ingresar escala." }]}
                label="Escala"
              >
                <InputNumber></InputNumber>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="prod_imagen"
                rules={[
                  {
                    required: true,
                    message: "Debes ingresar la imagen del producto.",
                  },
                ]}
                label="Imagen"
              >
                <Dragger
                  accept=".png,.jpg"
                  beforeUpload={agregarArchivoImagen.bind(this)}
                  onRemove={eliminarArchivoImagen.bind(this)}
                  fileList={archivoImagen}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click o arrastra y suelta para agregar archivos
                  </p>
                  <p className="ant-upload-hint"></p>
                </Dragger>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="prod_modelo"
                rules={[
                  {
                    required: true,
                    message: "Debes ingresar la imagen del modelo.",
                  },
                ]}
                label="Modelo"
              >
                <Dragger
                  accept=".gltf,.glb"
                  beforeUpload={agregarArchivoModelo.bind(this)}
                  onRemove={eliminarArchivoModelo.bind(this)}
                  fileList={archivoModelo}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click o arrastra y suelta para agregar archivos
                  </p>
                  <p className="ant-upload-hint"></p>
                </Dragger>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button
                  disabled={loading}
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                >
                  Crear producto
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}

export default CrearProductoComponent;

import React, { useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  Button,
  Form,
  Input,
  Checkbox,
  Select,
  Upload,
  message,
} from "antd";
import { useParams } from "react-router-dom";
import MaterialService from "../../services/MaterialService";
import ArtesanoService from "../../services/artesanoService";
import CatalogoService from "../../services/CatalogoService";
import { InboxOutlined } from "@material-ui/icons";
const { TextArea } = Input;
const artesanoService = new ArtesanoService();
const materialService = new MaterialService();

function EditarComponent() {
  const { Dragger } = Upload;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [archivoImagen, setArchivoImagen] = useState([]);
  const [archivoModelo, setArchivoModelo] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [principal, setPrincipal] = useState(0);
  const prod_id = useParams().prod_id;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [indicesMateriales, setIndicesMateriales]= useState([]);
  const [productOld, setProductOld] = useState(null);
  const [producto, setProducto] = useState({
    prod_id: "",
    prod_nombre: "",
    pArt_id: "",
    materiales_productos: [],
    prod_descrip: "",
    prod_principal: "",
    prod_scale: "",
    prod_imagen: "",
    prod_modelo3D: "",
    prod_std: "",
    prod_ubicacion: "",
  });
  const showModal = () => {
    setIsModalVisible(true);
    if (productOld !== null) {
      setProducto(productOld);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  useEffect(() => {
    CatalogoService.detalleProducto(prod_id)
      .then((res) => {
        console.log(res);
        let indices = [];
        res.materiales_productos.forEach((material) => {
          indices.push(material.mat_id);
        });
        setIndicesMateriales(indices);
        setProductOld(res);
        setProducto({
          prod_id: res.prod_id,
          prod_nombre: res.prod_nombre,
          pArt_id: res.pArt_id,
          materiales_productos: indicesMateriales,
          prod_descrip: res.prod_descrip,
          prod_principal: res.prod_principal,
          prod_scale: res.prod_scale,
          prod_imagen: res.prod_imagen,
          prod_modelo3D: res.prod_Modelo3D,
          prod_std: res.prod_std,
          prod_ubicacion: res.prod_ubicacion,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleOk = (e) => {
    setIsModalVisible(false);
    setLoading(true);
    let formulario = new FormData();
    formulario.append("prod_nombre", producto.prod_nombre);
    formulario.append("materiales_productos", indicesMateriales);
    formulario.append("pArt_id", producto.pArt_id);
    formulario.append("prod_descrip", producto.prod_descrip);
    formulario.append("prod_principal", principal);
    formulario.append("prod_scale", producto.prod_scale);
    formulario.append("prod_imagen", producto.prod_imagen)
    formulario.append("prod_modelo", producto.prod_modelo3D);
    formulario.forEach(ma=>{console.log(ma)});
    console.log(producto);
     artesanoService
      .actualizarProductos(prod_id, formulario)
      .then((response) => {
        console.log(prod_id);
        console.log(formulario);
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

  //mostrar materiales en el formulario
  useEffect(() => {
    materialService.buscarMateriales().then((response) => {
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
  function cambiarMaterial(e){
    setIndicesMateriales(e);
    console.log(e);
  }
  function onChange(e) {
    setPrincipal(e.target.checked ? 1 : 0);
    console.log(`checked = ${e.target.checked}`);
  }
  function cambiazo(e) {
    const { name, value } = e.target;
    setProducto((producto) => ({ ...producto, [name]: value }));
    console.log(producto);
    //setInputs(inputs => ({ ...inputs, [name]: value }));
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Editar
      </Button>
      <Modal
        title="Editar Producto"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleOk}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="prod_nombre" label="Nombre">
                <p>
                  <Input
                    name="prod_nombre"
                    value={producto.prod_nombre}
                    onChange={cambiazo}
                  />
                </p>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                name="mat_id"
                rules={[
                  {
                    message: "Indica el material del producto.",
                  },
                ]}
                label="Material"
              >
                <p>
                  <Select
                    mode="multiple"
                    defaultValue={indicesMateriales}
                    style={{ width: "100%" }}
                    onChange={cambiarMaterial}
                  >
                    {materiales}
                  </Select>
                </p>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="prod_descrip" label="Descripción">
                <p>
                  <TextArea
                    rows={4}
                    name="prod_descrip"
                    value={producto.prod_descrip}
                    onChange={cambiazo}
                  />
                </p>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="prod_principal">
                <p>
                  <Checkbox onChange={onChange}>Producto principal</Checkbox>
                </p>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="prod_scale" label="Escala">
                <p>
                  {" "}
                  <Input
                    type="number"
                    name="prod_scale"
                    value={producto.prod_scale}
                    onChange={cambiazo}
                  ></Input>
                </p>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="prod_imagen" label="Imagen">
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
              <Form.Item name="prod_modelo" label="Modelo">
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
      </Modal>
    </>
  );
}
export default EditarComponent;

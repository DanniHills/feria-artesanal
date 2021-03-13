import React, { useEffect, useState } from "react";
import { Card, Row, Col, Checkbox, Menu } from "antd";
import CatalogoService from "../../services/CatalogoService";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import {UserOutlined} from "@ant-design/icons";

const { Meta } = Card
function CatalogoComponent() {

  const uploadsUrl = 'http://localhost/';
  const [Catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    CatalogoService.obtenerCatalogo()
      .then((res) => {
        console.log(res);
        // setPuestos(res);
        setCatalogo(generarCatalogo(res));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  function generarCatalogo(puestos) {

    let Catalogo = [];

    puestos.forEach((producto) => {
      if (producto.prod_std) {
        Catalogo.push(
          <Col span={6}>
            <Link to={"/detalle/" + producto.prod_id}>
              <Card
                hoverable
                cover={<img style={{ width: '100%', height: '250px' }} alt="example" src={uploadsUrl + producto.prod_imagen} />}
              >
                <Meta title={producto.prod_nombre} />
              </Card>
            </Link>
          </Col>
        );
      }
    });
    return Catalogo;
  }

  return (
    <>
      <Row style={{ padding: 30 }} justify="start" align="stretch">
        <Col span={24}><h1 style={{ fontSize: 25 }}>Catálogo</h1></Col>
        <Col span={4}>
          <Menu defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline">
              <SubMenu Key="sub1" icon={<UserOutlined/>} title="Artesanos">
                <Menu.Item >
                <Checkbox onChange={onChange}>Checkbox</Checkbox>
                </Menu.Item>
              </SubMenu>
              <SubMenu Key="sub1" icon={<UserOutlined/>} title="Tecnicas">
                <Menu.Item >
                <Checkbox onChange={onChange}>Checkbox</Checkbox>
                </Menu.Item>
              </SubMenu>
              <SubMenu Key="sub1" icon={<UserOutlined/>} title="Materiales">
                <Menu.Item >
                <Checkbox onChange={onChange}>Checkbox</Checkbox>
                </Menu.Item>
              </SubMenu>
          </Menu>
        
        </Col>
        <Col style={{ marginTop: 30 }} span={20}>

          <Row gutter={[16, 24]} justify="start" align="stretch">
            {Catalogo}
          </Row>
        </Col>
      </Row>




    </>
  );
}

export default CatalogoComponent;

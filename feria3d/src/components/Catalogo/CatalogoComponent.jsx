import React, { useEffect, useState } from "react";
import { Card, Row, Col, Input } from "antd";
import CatalogoService from "../../services/CatalogoService";
import { Link } from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";

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
  
  const [filterTable, setFilterTable ] = useState(null);

  const onSearch = value => {
    value = value.target.value;
    let results = Catalogo.filter((el) =>
        el.prod_nombre.toLowerCase().indexOf(value.toLowerCase()) > -1 
       );
    setFilterTable(results);
  };

 
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
        <Row style={{padding: 30}} justify="start" align="top">
        <Col span={24}><h1 style={{fontSize: 25}}>Catálogo</h1></Col>
        <Col span={7}>
          <Input  suffix={<SearchOutlined />} placeholder="Ingrese nombre del producto " onKeyUp={onSearch}/>
        </Col>
        
        <Col style={{marginTop: 30}} span={24}>
          <Row gutter={[16, 24]}>
            {Catalogo}            
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default CatalogoComponent;


import React, { useEffect, useState } from 'react';
import { Input, Col, Row, Table, Space, Popconfirm, message } from 'antd';
import ArtesanoService from '../../services/artesanoService';
//import SessionService from '../../services/SessionService'
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';


const artesanoService = new ArtesanoService();
//const sessionService = new SessionService();

function BuscarProductoComponent() {
    
      const [dataSource, setDataSource] = useState([]);
      const [filterTable, setFilterTable ] = useState(null);
      const [loading, setLoading] = useState(true);
      let locale = { emptyText: 'No se encontraron resultados.'};

      const onSearch = value => {
        value = value.target.value;
        let results = dataSource.filter((el) =>
            el.prod_nombre.toLowerCase().indexOf(value.toLowerCase()) > -1 
           );
        setFilterTable(results);
      };

      function handleDelete( prod_id ) {
        setLoading(true);
        artesanoService.eliminarProductos(prod_id).then(response => {
          let ds = [...dataSource];
          setDataSource(ds.filter(item => item.prod_id !== prod_id));
          if(filterTable){
            ds = [...filterTable];
            setFilterTable(ds.filter(item => item.prod_id !== prod_id));
          }
          setLoading(false);
        }).catch(err => {
          message.error('Error de conexión con el servidor.');
          setLoading(false);
        });

      };
      
      const columns = [
        {
          title: 'Nombre',
          dataIndex: 'prod_nombre',
          width: '35%',
        },
        {
          title: 'Descripción',
          dataIndex: 'prod_descrip',
          width: '35%',
        },
        {
          title: 'Acciones',
          dataIndex: 'acciones',
          render: (text, record) =>
          dataSource.length >= 1 ? (
            <Space size="middle">
               <Link to={"/artesano/verProducto/" + record.prod_id}>
                <a href={() => false} >Ver</a>
            </Link>
              <Popconfirm title="¿Desea eliminar producto?" onConfirm={() => handleDelete(record.prod_id)}>
                <a  href={() => false}>Eliminar</a>
              </Popconfirm>
            </Space>
          ) : null,
        },
      ];
 

      useEffect( () => {
        artesanoService.buscarProductos().then(response => {
          setDataSource(response)
          setLoading(false);
        }).catch(err => {
          setLoading(false);
          message.error('Error de conexión con el servidor.');
        });
      }, [loading]);

    return (
        <>
        <Row style={{padding: 30}} justify="start" align="top">
          <Col span={24}><h1 style={{fontSize: 25}}>Buscar Producto</h1></Col>
          <Col span={7}>
            <Input  suffix={<SearchOutlined />} placeholder="Ingrese nombre del producto " onKeyUp={onSearch} />
          </Col>
          
          <Col style={{marginTop: 30}} span={24}>
              <Table locale={locale} loading={loading} dataSource={filterTable == null ? dataSource : filterTable} pagination={dataSource.length > 10 ? true : false} columns={columns} rowKey="prod_id" />
          </Col>
        </Row>
        </>
  );
}
export default BuscarProductoComponent;
import React, { useEffect, useState } from "react";
import { Col, Row,Table, Input, Popconfirm, Form, message, Space, Button } from "antd";
import AdministradorService from '../../services/administradorService';
import { SearchOutlined } from '@ant-design/icons';
import {DeleteTwoTone, EditTwoTone } from "@material-ui/icons";
const administradorService = new AdministradorService();

function BuscarPuestoComponent() {
  const [dataSource, setDataSource] = useState([]);
  const [filterTable, setFilterTable ] = useState(null);
  const [loading, setLoading] = useState(true);

  const EditableCell = ({editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const EditableTable = () => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
  
    const isEditing = (record) => record.pArt_id === editingKey;
  
    const edit = (record) => {
      form.setFieldsValue({
        pArt_nombre: '',
        pArt_Descrip: '',
        ...record,
      });
      
      //console.log('edit record ',record);
      setEditingKey(record.pArt_id);
    };
  
    const cancel = () => {
      setEditingKey('');
    };
  
    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newDataSource = [...dataSource];
        const indexDataSource = newDataSource.findIndex((item) => key === item.pArt_id);
    
        if (indexDataSource > -1) {
          const item = newDataSource[indexDataSource];
          newDataSource.splice(indexDataSource, 1, { ...item, ...row });
          setDataSource(newDataSource);
          setEditingKey('');
        } else {
          newDataSource.push(row);
          setDataSource(newDataSource);
          setEditingKey('');
        }

        if(filterTable){
          const newFilterTable = [...filterTable];
          const indexFilterTable = newFilterTable.findIndex((item) => key === item.pArt_id);

          if (indexFilterTable > -1) {
            const item = newFilterTable[indexFilterTable];
            newFilterTable.splice(indexFilterTable, 1, { ...item, ...row });
            setFilterTable(newFilterTable);
            setEditingKey('');
          } else {
            newDataSource.push(row);
            setFilterTable(newFilterTable);
            setEditingKey('');
          }
        }
        const puesto = newDataSource[indexDataSource];
        administradorService.actualizarPuesto(puesto.pArt_id, puesto).then(response => {
          //console.log(response);
          message.success(response.message);
        }).catch(err => {
          message.error('Error de conexión con el servidor.');
        });
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
  
    const columns = [
      {
        title: 'Nombre Puesto Artesanal',
        dataIndex: 'pArt_nombre',
        width: '25%',
        editable: true,
      },
      {
        title: 'Descripción Puesto Artesanal',
        dataIndex: 'pArt_descrip',
        width: '50%',
        editable: true,
      },
      {
        title: 'Activo',
        dataIndex: 'pArt_std',
        width: '15%',
        editable: true,
      },
      {
        title: 'Acciones',
        dataIndex: 'Acciones',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Popconfirm title="Desea guardar cambios?" onConfirm={() => save(record.pArt_id)}>
                <a href={() => false} >Confirmar</a>
              </Popconfirm>
              <a href={() => false} style={{marginLeft: 8}} onClick={cancel}>Cancelar</a>
            </span>
          ) : (
            <Space size="middle">
            
            <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditTwoTone/>
            </Button>  
              <Popconfirm title="¿Desea eliminar Puesto Artesanal?" onConfirm={() => handleDelete(record.pArt_id)}>
                <Button disabled={editingKey !== ''} ><DeleteTwoTone   /></Button>
              </Popconfirm>
           
            </Space>
            
          );
        },
      },
    ];
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
  
      return {
        ...col,
        onCell: (record) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    return (
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={filterTable == null ? dataSource : filterTable}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    );
  };

  const onSearch = value => {
    value = value.target.value;
    let results = dataSource.filter((el) =>
        el.pArt_nombre.toLowerCase().indexOf(value.toLowerCase()) > -1 
       );
    setFilterTable(results);
  };

  useEffect( () => {
    administradorService.buscarPuesto().then(response => {
      response.forEach((puesto, index) => {
        response[index].key = index;
      });
      setDataSource(response)
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      message.error('Error de conexión con el servidor.');
    });
  }, [loading]);

  function handleDelete( pArt_id ) {
    setLoading(true);
    administradorService.eliminarPuesto(pArt_id).then(response => {
      let ds = [...dataSource];
      setDataSource(ds.filter(item => item.pArt_id !== pArt_id));
      if(filterTable){
        ds = [...filterTable];
        setFilterTable(ds.filter(item => item.pArt_id !== pArt_id));
      }
      setLoading(false);
    }).catch(err => {
      message.error('Error de conexión con el servidor.');
      setLoading(false);
    });

  };
    return (
      <>
        <Row style={{padding: 30}} justify="start" align="top">
          <Col span={24}><h1 style={{fontSize: 25}}>Buscar Puesto Artesanal</h1></Col>
          <Col span={7}>
            <Input  suffix={<SearchOutlined />} placeholder="Ingrese nombre del puesto artesanal " onKeyUp={onSearch} />
          </Col>
          
          <Col style={{marginTop: 30}} span={24}>
            <EditableTable />
          </Col>
        </Row>
        </>


     
    );
}
export default BuscarPuestoComponent;

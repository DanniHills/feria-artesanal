import React, { useEffect, useState } from 'react';
import { Input, Col, Row, Table, Space, Popconfirm, message, Form, Button, Select } from 'antd';
import AdministradorService from '../../services/administradorService';

import { SearchOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
const { Option} = Select;
const administradorService = new AdministradorService();

function BuscarArtesanoComponent() {
    
      const [dataSource, setDataSource] = useState([]);
      const [filterTable, setFilterTable ] = useState(null);
      const [loading, setLoading] = useState(true);
      let locale = { emptyText: 'No se encontraron resultados.'};

      const onSearch = value => {
        value = value.target.value;
        let results = dataSource.filter((el) =>
            el.art_nombre.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
            el.art_apellido.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
            el.art_correo.toLowerCase().indexOf(value.toLowerCase()) > -1
           );
        setFilterTable(results);
      };

     
      const EditableCell = ({editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
     
        const inputNode = inputType === 'select' ? <Select defaultValue={record.art_std}>
        <Option value="Activo" >Activo</Option>
        <Option value="Inactivo" >Inactivo</Option>
        </Select> : <Input />;
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
                {inputNode}
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
      
        const isEditing = (record) => record.art_id === editingKey;
      
        const edit = (record) => {
          form.setFieldsValue({
            art_nombre: '',
            art_apellido: '',
            art_rut: '',
            art_fono: '',
            art_correo: '',
            art_std:'',
            
            ...record,
          });
          
          //console.log('edit record ',record);
          setEditingKey(record.art_id);
        };
      
        const cancel = () => {
          setEditingKey('');
        };
      
        const save = async (key) => {
          try {
            const row = await form.validateFields();
            const newDataSource = [...dataSource];
            const indexDataSource = newDataSource.findIndex((item) => key === item.art_id);
        
            if (indexDataSource > -1) {
              const item = newDataSource[indexDataSource];
              newDataSource.splice(indexDataSource, 1, { ...item, ...row });
             // setDataSource(newDataSource);
              //setEditingKey('');
            } else {
              newDataSource.push(row);
              //setDataSource(newDataSource);
              //setEditingKey('');
            }

            if(filterTable){
              const newFilterTable = [...filterTable];
              const indexFilterTable = newFilterTable.findIndex((item) => key === item.art_id);

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
            const art = newDataSource[indexDataSource];
            art.art_std = art.art_std==='Activo'?1:0;
            administradorService.actualizarArtesano(art.art_id, art).then(response => {
              console.log(response);

              if(response.status===500){
                console.log(response.message);
                message.error(' Rut o Correo duplicado');
                setDataSource(dataSource);
              }
              if(response.status===200){
                setDataSource(newDataSource);
                setEditingKey('');
                message.success('Artesano actualizado');
              }
            }).catch(err => {
              message.error('Error de conexión con el servidor');
            });
          } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
          }
        };
      
        const columns = [
          {
            title: 'Nombre Artesano',
            dataIndex: 'art_nombre',
            width: '15%',
            editable: true,
            
            
          },
          {
            title: 'Apellido Artesano',
            dataIndex: 'art_apellido',
            width: '15%',
            editable: true,
          
          },
          {
            title: 'Rut',
            dataIndex: 'art_rut',
            width: '15%',
            editable: true,
           
          },
          {
            title: 'Telefono ',
            dataIndex: 'art_fono',
            width: '15%',
            editable: true,
          
          },
          {
            title: 'Correo',
            dataIndex: 'art_correo',
            width: '15%',
            editable: true,
            
          },
          {
            title: 'Estado',
            dataIndex: 'art_std',
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
                  <Popconfirm title="Desea guardar cambios?" onConfirm={() => save(record.art_id)}>
                    <a  href={() => false}>Confirmar</a>
                  </Popconfirm>
                  <a  href={() => false} style={{marginLeft: 8}} onClick={cancel}>Cancelar</a>
                </span>
              ) : (
                <Space size="middle">
            
            <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditTwoTone/>
            </Button>  

              <Popconfirm title="¿Desea eliminar Feria?" onConfirm={() => handleDelete(record.art_id)}>
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
              inputType: col.dataIndex === 'art_std' ? 'select' : 'text',
              title: col.title,
              editing: isEditing(record),
            }),
          };
        });
        return (
          <Form form={form} component={false}>
            <Table  
            scroll={{ x: 1000 }}
              locale={locale} 
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


      useEffect( () => {
        administradorService.buscarArtesanos().then(response => {
          response.forEach((e) => {
           e.art_std= e.art_std?'Activo':'Inactivo'
          });
          setDataSource(response)
          setLoading(false);
         
        }).catch(err => {
          setLoading(false);
          message.error('Error de conexión con el servidor.');
        });
      }, [loading]);

      function handleDelete( art_id ) {
        setLoading(true);
        administradorService.eliminarArtesano(art_id).then(response => {
          let ds = [...dataSource];
          setDataSource(ds.filter(item => item.art_id !== art_id));
          if(filterTable){
            ds = [...filterTable];
            setFilterTable(ds.filter(item => item.pArt_id !== art_id));
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
          <Col span={24}><h1 style={{fontSize: 25}}>Buscar Artesano</h1></Col>
          <Col lg={8 } md={8} sm={24} xs={24} >
            <Input  suffix={<SearchOutlined />} placeholder="Ingrese datos " onKeyUp={onSearch} />
          </Col>
          
          <Col style={{marginTop: 30}}span={24} >
            <EditableTable />
          </Col>
        </Row>
        </>
  );
}
export default BuscarArtesanoComponent;
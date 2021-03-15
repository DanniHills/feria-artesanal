/* eslint-disable no-const-assign */


import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Divider } from 'antd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import PuestosService from '../../services/PuestosService'
import SessionService from '../../services/SessionService'
import ArtersanoService from '../../services/artesanoService'

const sessionService = new SessionService();
const puestosService = new PuestosService();
const artesanoService = new ArtersanoService();

function UbicacionProductosCentralComponent() {
  const [items, setItems] = useState([]);// le mando el arreglo
  const baseURL = 'http://localhost/';
  const puestoid = [];
  const ubicacionOld = [];
  const datos = [];
  useEffect(() => {
    
    console.log(sessionService.getUserData().art_id);
    puestosService.buscarPuestosArtesanoId(sessionService.getUserData().art_id).then((puestos) => {
      puestos.forEach(id => {
        puestoid.push(id.pArt_id);
        console.log(puestoid);
      })
      PuestosService.obtenerPuestoConProductos(puestoid.shift()).then(prod => {
        prod.productos.forEach((p, index) => {
          console.log(p)
          if (p.prod_principal=== 1){
            datos.push({
            index: p.prod_id,
            productos: p,
            imageSrc: baseURL + p.prod_imagen
          })
          ubicacionOld.push(p.prod_ubicacion)}
        })

        console.log('old', ubicacionOld)
        setItems(datos)
      })
    }).catch()
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newUbicacion = arrayMove(items, oldIndex, newIndex);
    setItems(newUbicacion);
    console.log('new', newUbicacion);
   
    console.log('i',newUbicacion);
    newUbicacion.forEach((item, index)=>{
      console.log('items',item.index, index)
      let ubicacion = new FormData();
      ubicacion.append("prod_ubicacion", index);
      artesanoService.actualizarProductos(item.index,ubicacion).then().catch();
    })
   
      

    //servicio
    // mandar index 

  };
  const SortableItem = SortableElement(({ item }) => (
    <Card > 
      <img style={{width: '100%', height: '100px'}}alt="" src={item.imageSrc} />
      <p>{item.productos.prod_nombre}</p>
    </Card>
  ));
// crear contador para generar solo 4 card y colocar offset
  const SortableList = SortableContainer(({ items }) => (
    <Row className="container" align="top">
      {items.map((item, index) => (
        <Col    key ={index} style={{ padding: '4px 4px 4px 4px' }}  lg={12} md={12} sm={12} xs={12}> 
          <SortableItem
            key={item.index}
            index={index}
            item={item}
          />
        </Col>
      ))}
    </Row>
  ));
  return (
    <>
      
        <Divider>Ubicación</Divider>
        <Row justify="center" >
        <Col span={8}>
        <SortableList
          items={items}
          onSortEnd={onSortEnd}
          axis="xy"
          helperClass="SortableHelper"
        />
        </Col>
      </Row>
    </>
    );
    }
    export default UbicacionProductosCentralComponent;
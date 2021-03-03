import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Divider } from 'antd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import TecnicasService from '../../services/TecnicaService';
import PuestosService from '../../services/PuestosService';


const tecnicasService = new TecnicasService();
const puestosService = new PuestosService();

const SortableItem = SortableElement(({ value }) => (
  <Card tabIndex={0}>{value}</Card>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul style={{ padding: 0 }}>
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});

function UbicacionPuestosComponent() {
  const [tecnicas, setTecnicas] = useState([]);
  const [tecnicasOld, setTecnicasOld] = useState([]);
  useEffect(() => {
    tecnicasService.buscarTecnicas().then((response) => {
      let tec = [];
      setTecnicasOld(response);
      response.forEach((tecnica) => {
        tec.push(tecnica.tec_nombre);
      });
      setTecnicas(tec);
    });
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newtecnicas = arrayMove(tecnicas, oldIndex, newIndex);
    setTecnicas(newtecnicas);
    let tecnicasID=[];
    newtecnicas.forEach(tecNew=>{
      tecnicasOld.forEach(tecOld => {
        if(tecOld.tec_nombre=== tecNew){
          tecnicasID.push(tecOld.tec_id);
        }
      });
    });
    const tecId = JSON.stringify(tecnicasID);
    puestosService.ordenarPuestos(tecId);
    //llamar servicio ordenarubicacion  mandar arreglo
    // json.Stringify front
    // json.parser
    //que se hace en el backend
  };

  return (
    <>
      <Row style={{ padding: 30 }} justify="start" align="top">
        <Col span={24}><h1 style={{ fontSize: 25 }}>Asignación de Puestos Artesanales</h1></Col>
        <Divider orientation="left">Configuración </Divider>

        <Col style={{ marginTop: 30 }} span={6} offset={6}>
          <Card >Zona A </Card>
          <Card >Zona B </Card>
          <Card >Zona C </Card>
          <Card >Zona D </Card>
          <Card >Zona E </Card>
          <Card >Zona F </Card>
        </Col>
        <Col style={{ marginTop: 30 }} span={6}>
          {tecnicas.length > 0 &&
            <SortableList items={tecnicas} onSortEnd={onSortEnd}></SortableList>
          }
        </Col>
      </Row>

    </>
  );
}
export default UbicacionPuestosComponent;
// LLAMAR TRABAJADORA SOCIAL

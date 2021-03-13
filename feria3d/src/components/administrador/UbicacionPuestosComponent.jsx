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
  const [ubicacion, setUbicacion] = useState([]);

  useEffect(() => {
    PuestosService.obtenerPuestos().then((puestoUbicacion) => {
      let tecnicafilter =[];
      puestoUbicacion.forEach((puest) => {
        tecnicafilter.push(puest.tec_id)   
        const unicos = tecnicafilter.filter((valor, indice) => {
         return tecnicafilter.indexOf(valor) === indice;
        } 
      );
        tecnicasService.buscarTecnicas().then((tecActual) => {
          let tec = [];
          let teca = [];
          let i=0;
          setTecnicasOld(tecActual);
          unicos.forEach((Actual) => {
            tecActual.forEach((tecnica) => {
              if (Actual === tecnica.tec_id) {
                tec.push(tecnica.tec_nombre);
                i=i+1;
                teca.push(`Zona ${i}`);
              }
            })
          })
          setUbicacion(teca);
          setTecnicas(tec);
        });
      })
    });
  }, []);


  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newtecnicas = arrayMove(tecnicas, oldIndex, newIndex);
    setTecnicas(newtecnicas);
    let tecnicasID = [];
    newtecnicas.forEach(tecNew => {
      console.log(tecNew)
      tecnicasOld.forEach(tecOld => {
        if (tecOld.tec_nombre === tecNew) {
          console.log(tecOld.tec_id)
          tecnicasID.push(tecOld.tec_id);
        }
      });
    });
    const tecId = JSON.stringify(tecnicasID);
    console.log(tecnicasID)
    puestosService.ordenarPuestos(tecId);
  };

  return (
    <>
      <Row style={{ paddingTop:25 }} justify="center" align="top">
        <Col span={24}><h1 style={{ fontSize: 25 }}>Asignación de Puestos Artesanales</h1></Col>
        <Divider orientation="left">Configuración </Divider>

        <Col style={{ marginTop: 30 }} span={8} >
          {ubicacion.length>0 &&
          <SortableList items={ubicacion}></SortableList>}
        </Col>
        <Col style={{ marginTop: 30 }}  span ={8}>
          {tecnicas.length > 0 &&
            <SortableList items={tecnicas} onSortEnd={onSortEnd}></SortableList>
          }
        </Col>
      </Row>
    </>
  );
}
export default UbicacionPuestosComponent;
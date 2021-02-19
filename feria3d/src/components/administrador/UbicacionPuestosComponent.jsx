import React, { useState }  from 'react';
import { Card, Col, Row, Divider} from 'antd';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';


const SortableItem = SortableElement(({value}) => (
    <Card  tabIndex={0}>{value}</Card>
  ));
  
const SortableList = SortableContainer(({items}) => {
return (
  <ul style ={{padding:0}}>
    {items.map((value, index) => (
      <SortableItem key={`item-${value}`} index={index} value={value} />
    ))}
  </ul>
);
});
function UbicacionPuestosComponent() {
  
    const [items, setItems] = useState(['Tallado', 'Modelado', 'Cesteria', 'Orfebreria', 'Trenzado', 'Tejido']);
    const onSortEnd = ({oldIndex, newIndex}) => {
      setItems(arrayMove(items, oldIndex, newIndex));
      console.log(oldIndex, newIndex);
      console.log(arrayMove(items, oldIndex, newIndex));
    };
      
    return (
        <>
       <Row style={{padding: 30}} justify="start" align="top">
          <Col span={24}><h1 style={{fontSize: 25}}>Asignación de Puestos Artesanales</h1></Col>
            <Divider orientation="left">Configuración </Divider>
          
        <Col style={{marginTop: 30}} span={6} offset ={6}>
                <Card >Zona A </Card>
                <Card >Zona B </Card>
                <Card >Zona C </Card>
                <Card >Zona D </Card>
                <Card >Zona E </Card>
                <Card >Zona F </Card>
            </Col>
          <Col style={{marginTop: 30}} span={6}> 
            <SortableList items={items} onSortEnd={onSortEnd}></SortableList>
          </Col>
        </Row>
      
        </>
  );
}
export default UbicacionPuestosComponent;
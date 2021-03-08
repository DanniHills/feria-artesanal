

import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Divider } from 'antd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';


const getRandomValue = () => {
  return Math.floor(Math.random() * 400) + 1;
};

let state = [1, 2, 3, 4, 5,6 ,7,8 ,9 ,10].map((val, index) => ({
  title: 'Item ' + index,
  index: index,
  id: index+1,
  imageSrc: `https://picsum.photos/180/180?random=${getRandomValue()}`
}));

function UbicacionProductosComponent() {
  const [items, setItems]= useState(state);
  console.log("wea");

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  
    const SortableItem = SortableElement(({ item }) => (
     <Card>
          <img  style={{width: '100%'}} alt ="" src={item.imageSrc} />
          </Card>
    ));

    const SortableList = SortableContainer(({ items }) => (
      <Row className="container">
        {items.map((item, index) => (
           <Col  style ={{padding: 10}} span={4}>
          
          <SortableItem
            key={`${item.id}`}
            index={index}
            item={item}
          />
      
          </Col>
        ))}
      </Row>
    ));
  return (
    <>
    <Row>
      <Divider>Ubicación</Divider>
       <SortableList
        items={items}
        onSortEnd={onSortEnd}
        axis="xy"
        helperClass="SortableHelper"
      />
      </Row>
    </>
  );
}
export default UbicacionProductosComponent;
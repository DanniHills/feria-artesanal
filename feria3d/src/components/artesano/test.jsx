import React, { useState }  from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';


const getRandomValue = () => {
  return Math.floor(Math.random() * 400) + 1;
};

let state = [1, 2, 3, 4, 5].map((val, index) => ({
  title: 'Item ' + index,
  index: index,
  id: index+1,
  imageSrc: `https://picsum.photos/180/180?random=${getRandomValue()}`
}));

function SortableComponent() {
  const [items, setItems]= useState(state);
  console.log("wea");

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  
    const SortableItem = SortableElement(({ item }) => (
      <div className="item">
        <div className="inner-item">
          <img  alt ="" src={item.imageSrc} />
        </div>
      </div>
    ));

    const SortableList = SortableContainer(({ items }) => (
      <div className="container">
        {items.map((item, index) => (
          <SortableItem
            key={`${item.id}`}
            index={index}
            item={item}
          />
        ))}
      </div>
    ));

    return (
      <SortableList
        items={items}
        onSortEnd={onSortEnd}
        axis="xy"
        helperClass="SortableHelper"
      />
    );
  
}
export default SortableComponent;
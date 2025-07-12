// import type { MouseEvent } from "react";

import { useState } from "react";

interface ListGroupProps {
  items: string[];
  heading: string;
  // (item: string) => void (the selected item)
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  // Hook to tell react that this component has state that may change over time;
  const [selectedIndex, setSelectedIndex] = useState(-1); // -1 will be the starter value for selectedIndex

  // const handleClick = (event: MouseEvent) => {

  //   console.log(event);
  // }
  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">
        {items.map(
          (
            item,
            index //Map can also do (item, index), just put that instead.
          ) => (
            <li
              key={item}
              className={
                selectedIndex === index
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => {
                setSelectedIndex(index);
                onSelectItem(item);
              }}
            >
              {item}
            </li>
          )
        )}
      </ul>
    </>
  );
}

export default ListGroup;

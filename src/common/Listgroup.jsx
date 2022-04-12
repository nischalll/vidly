import React from "react";

export default function Listgroup({
  items,
  textProperty,
  valueProperty,
  onGenreSelect,
  selectedItem
}) {
  console.log("selected items",selectedItem);
  return (
      <ul className="list-group">
        {items.map((i) => (
          <li
            onClick={() => onGenreSelect(i)}
            key={i[valueProperty]}
            className={i===selectedItem? "list-group-item active" : "list-group-item"}
          >
            {i[textProperty]}
          </li>
        ))}
      </ul>
  );
}

Listgroup.defaultProps={
    textProperty:'name',
    valueProperty:"_id"
};
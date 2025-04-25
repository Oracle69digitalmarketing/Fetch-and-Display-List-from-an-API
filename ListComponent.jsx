import React from "react";

export default function ListComponent({ items, renderItem, emptyMessage = "No items to display." }) {
  if (!items || items.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id || index}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

import React from "react";

export default function ListComponent({ items, renderItem, emptyMessage = "No items to display." }) {
  if (!items || items.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id ?? `${item.name}-${item.email}-${Math.random()}`}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
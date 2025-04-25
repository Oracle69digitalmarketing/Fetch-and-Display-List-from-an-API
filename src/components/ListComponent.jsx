import { useState, useMemo } from 'react';

export default function ListComponent({ items, renderItem, filterKey = '' }) {
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    if (!filterKey || !search.trim()) return items;
    return items.filter(item =>
      item[filterKey]?.toString().toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search, filterKey]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search..."
        className="mb-3 w-full p-2 border rounded"
      />
      <ul className="space-y-2">
        {filteredItems.length ? (
          filteredItems.map((item, index) => (
            <li key={item.id || index} className="p-2 border rounded">
              {renderItem(item)}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No results found.</li>
        )}
      </ul>
    </div>
  );
}
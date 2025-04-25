import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ListComponent from '../components/ListComponent';
import html2canvas from 'html2canvas';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setData(res.data))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  const handleScreenshot = () => {
    if (!listRef.current) return;
    html2canvas(listRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = 'screenshot.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button onClick={handleScreenshot} className="btn">Take Screenshot</button>
      </div>

      <div ref={listRef}>
        <ListComponent
          items={data}
          filterKey="name"
          renderItem={(item) => (
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>{item.email}</p>
              <p className="text-sm text-gray-600">{item.company?.name}</p>
            </div>
          )}
        />
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import ListComponent from "./ListComponent";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "300px",
        }}
      />

      <ListComponent
        items={filteredUsers}
        renderItem={(user) => (
          <div>
            <strong>{user.name}</strong> – {user.email}
          </div>
        )}
      />
    </div>
  );
}
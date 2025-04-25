import React, { useState, useEffect, useCallback } from "react";
import ListComponent from "./ListComponent";
import { debounce } from "./utils/debounce";

const ITEMS_PER_PAGE = 5;

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(() => setError("Failed to fetch users."))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = useCallback(
    debounce((term) => {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredUsers(filtered);
      setPage(1);
    }, 300),
    [users]
  );

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  return (
    <div style={{ padding: 20 }}>
      <h2>User List</h2>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search users..."
        onChange={onSearchChange}
        style={{
          marginBottom: "16px",
          padding: "8px",
          borderRadius: "4px",
          width: "100%",
          maxWidth: "300px",
        }}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <ListComponent
            items={paginatedUsers}
            renderItem={(user) => (
              <div>
                <strong>{user.name}</strong> – {user.email}
              </div>
            )}
          />

          {totalPages > 1 && (
            <div style={{ marginTop: 16 }}>
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setPage(idx + 1)}
                  style={{
                    padding: "6px 10px",
                    margin: "0 5px",
                    background: page === idx + 1 ? "#333" : "#ccc",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
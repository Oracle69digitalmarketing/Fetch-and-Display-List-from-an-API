import React, { useEffect, useState } from "react";
import { buildSearchIndex } from "../utils/miniSearch";
import ListComponent from "./ListComponent";
import Pagination from "./Pagination";

const ListWithSearch = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [miniSearch, setMiniSearch] = useState(null);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (data.length) {
      const index = buildSearchIndex(data);
      setMiniSearch(index);
      setResults(data);
    }
  }, [data]);

  useEffect(() => {
    if (miniSearch && searchTerm.trim()) {
      const hits = miniSearch.search(searchTerm);
      setResults(hits);
      setCurrentPage(1);
    } else if (miniSearch) {
      setResults(data);
    }
  }, [searchTerm]);

  const paginated = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <input
        className="border p-2 mb-4 w-full max-w-md"
        placeholder="Search by name, title, etc."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <ListComponent items={paginated} />
      <Pagination
        currentPage={currentPage}
        totalItems={results.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ListWithSearch;
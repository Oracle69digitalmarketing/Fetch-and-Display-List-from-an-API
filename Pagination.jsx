const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={`px-4 py-2 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
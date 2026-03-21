import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) {
  const pages = [];
  const maxVisible = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-[#E5E7EB] gap-4">
      {onItemsPerPageChange && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#6B7280]">Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-[#6B7280]">per page</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#F9FAFB] disabled:hover:text-[#0A0A0A] disabled:hover:border-[#E5E7EB] group"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-9 h-9 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center text-sm hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] transition-all"
            >
              1
            </button>
            {startPage > 2 && <span className="text-[#9CA3AF]">...</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
              currentPage === page
                ? "bg-[#0A0A0A] text-white border border-[#0A0A0A]"
                : "bg-[#F9FAFB] text-[#0A0A0A] border border-[#E5E7EB] hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A]"
            }`}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-[#9CA3AF]">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-9 h-9 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center text-sm hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] transition-all"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-full bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center hover:bg-[#0A0A0A] hover:text-white hover:border-[#0A0A0A] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#F9FAFB] disabled:hover:text-[#0A0A0A] disabled:hover:border-[#E5E7EB] group"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;

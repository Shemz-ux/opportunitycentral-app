function Filters({ categories, selectedCategory, onCategoryChange, selectedStatus, onStatusChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {categories && (
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-5 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors cursor-pointer min-w-[160px]"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}

      {onStatusChange && (
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-5 py-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors cursor-pointer min-w-[160px]"
        >
          <option value="">All Status</option>
          <option value="active">Published</option>
          <option value="inactive">Unpublished</option>
        </select>
      )}
    </div>
  );
}

export default Filters;
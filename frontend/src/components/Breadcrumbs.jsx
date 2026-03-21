import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-2 mb-8">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />}
          {item.href ? (
            <Link
              to={item.href}
              className="text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-sm text-[#0A0A0A]">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

export default Breadcrumbs;

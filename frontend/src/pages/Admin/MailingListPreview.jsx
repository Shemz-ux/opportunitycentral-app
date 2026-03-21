import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import Pagination from "../../components/Pagination";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

function MailingListPreview({ subscribers, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, subscriber: null });
  const mailPerPage = 6;

  const totalPages = Math.ceil(subscribers.length / mailPerPage);
  const startIndex = (currentPage - 1) * mailPerPage;
  const paginatedMail = subscribers.slice(startIndex, startIndex + mailPerPage);

  const handleDelete = (subscriber) => {
    setDeleteModal({ isOpen: true, subscriber });
  };

  const confirmDelete = () => {
    if (onDelete && deleteModal.subscriber) {
      onDelete(deleteModal.subscriber.id);
    }
    setDeleteModal({ isOpen: false, subscriber: null });
  };

  const handleExport = () => {
    const csv = [
      ["Position", "Email", "Date Joined"],
      ...subscribers.map((s, idx) => [idx + 1, s.email, s.dateJoined || "N/A"])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mailing-list.csv";
    a.click();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-[24px] font-light text-[#0A0A0A]">Mailing list</h3>
        <button 
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] rounded-full text-xs text-[#0A0A0A] hover:bg-[#F9FAFB] transition-colors"
        >
          <Download className="w-3 h-3" />
          Export
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              <th className="text-left py-3 px-2 text-xs font-normal text-[#9CA3AF]">Email</th>
              <th className="text-left py-3 px-2 text-xs font-normal text-[#9CA3AF]">Date Joined</th>
              <th className="text-right py-3 px-2 text-xs font-normal text-[#9CA3AF]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMail.map((subscriber) => (
              <tr key={subscriber.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                <td className="py-3 px-2 text-sm text-[#0A0A0A]">{subscriber.email}</td>
                <td className="py-3 px-2 text-sm text-[#6B7280]">{subscriber.dateJoined || "N/A"}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleDelete(subscriber)}
                      className="w-7 h-7 rounded-full bg-[#F9FAFB] flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {subscribers.length > mailPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, subscriber: null })}
        onConfirm={confirmDelete}
        title="Remove Subscriber?"
        message={`Are you sure you want to remove "${deleteModal.subscriber?.email}" from the mailing list?`}
      />
    </div>
  );
}

export default MailingListPreview;

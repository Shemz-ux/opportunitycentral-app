import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Trash2, Mail } from "lucide-react";
import Pagination from "../../components/Pagination";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import Breadcrumbs from "../../components/Breadcrumbs";
import { getMailingList } from "../../services/mailingData";

const mailingList = getMailingList();

function MailingList() {
  const navigate = useNavigate();
  const [subscribers, setSubscribers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, subscriber: null });

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
    setSubscribers(mailingList);
  }, [navigate]);

  const filteredSubscribers = subscribers;

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubscribers = filteredSubscribers.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (subscriber) => {
    setDeleteModal({ isOpen: true, subscriber });
  };

  const confirmDelete = () => {
    setSubscribers(subscribers.filter((s) => s.id !== deleteModal.subscriber.id));
    setDeleteModal({ isOpen: false, subscriber: null });
  };

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Date"],
      ...filteredSubscribers.map(s => [s.name, s.email, s.date])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mailing-list.csv";
    a.click();
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Mailing List" }
  ];

  return (
    <section className="min-h-screen bg-[#FFFFFF] py-6 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-[28px] sm:text-[40px] leading-[1.2] font-light text-[#0A0A0A] mb-2">
              Mailing <span className="text-[#9CA3AF]">List</span>
            </h1>
            <p className="text-sm sm:text-base text-[#6B7280]">Manage your email subscribers</p>
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-[#E5E7EB] rounded-full text-xs sm:text-sm text-[#0A0A0A] hover:bg-[#F9FAFB] transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-4 sm:p-6 lg:p-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left py-4 px-4 text-sm font-normal text-[#9CA3AF]">Name</th>
                  <th className="text-left py-4 px-4 text-sm font-normal text-[#9CA3AF]">Email</th>
                  <th className="text-left py-4 px-4 text-sm font-normal text-[#9CA3AF]">Date Joined</th>
                  <th className="text-right py-4 px-4 text-sm font-normal text-[#9CA3AF]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-4 px-4 text-sm text-[#0A0A0A]">{subscriber.name}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#9CA3AF]" />
                        <span className="text-sm text-[#6B7280]">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#6B7280]">{subscriber.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDelete(subscriber)}
                          className="w-8 h-8 rounded-full bg-[#F9FAFB] flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginatedSubscribers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-base text-[#9CA3AF]">No subscribers found</p>
              </div>
            )}
          </div>

          {filteredSubscribers.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, subscriber: null })}
        onConfirm={confirmDelete}
        title="Remove Subscriber?"
        message={`Are you sure you want to remove ${deleteModal.subscriber?.email} from the mailing list?`}
      />
    </section>
  );
}

export default MailingList;
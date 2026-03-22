import { X, AlertTriangle } from "lucide-react";

function DeleteConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#F9FAFB] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 text-[#6B7280]" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>

          <h3 className="text-[24px] font-normal text-[#0A0A0A] mb-3">
            {title || "Are you sure you want to delete?"}
          </h3>

          <p className="text-base text-[#6B7280] leading-relaxed mb-8">
            {message || "This action cannot be undone. The item will be permanently deleted."}
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] hover:bg-[#F9FAFB] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 px-6 py-3 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;

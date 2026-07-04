function Modal({
  title,
  isOpen,
  onClose,
  children
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl">

        <div className="flex justify-between items-center border-b p-5">
          <h2 className="text-2xl font-bold text-[#232946]">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;
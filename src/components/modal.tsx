type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  confetti?: React.ReactNode;
};

export default function Modal({
  open,
  onClose,
  children,
  confetti,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      {confetti}
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

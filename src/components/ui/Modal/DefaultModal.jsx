import "./DefaultModal.scss";
import { X } from "lucide-react";
import { useScrollLock } from "../../../hooks/useScrollLock";

const DefaultModal = ({ isVisible, children, onClose }) => {
  useScrollLock(isVisible);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className="modal_background_full" onClick={onClose} />
      <div className="modal_wrapper">
        <button type="button" className="modal_close_btn" onClick={onClose}>
          <X color="#9d9da5" />
        </button>
        <div className="modal_inner_wrapper">{children}</div>
      </div>
    </>
  );
};

export default DefaultModal;

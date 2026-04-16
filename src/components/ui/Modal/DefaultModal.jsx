import "./DefaultModal.scss"
import { X } from "lucide-react";

const DefaultModal = ({ isVisible, children, onClose }) => {
  return (
    <div>
      { isVisible && (
        <>
          <div className="modal_background_full" onClick={onClose}></div>
          <div className="modal_wrapper">
            <button className="modal_close_btn" onClick={onClose}>
              <X color="#9d9da5" />
            </button>
            <div className="modal_inner_wrapper">
              { children }
            </div>
          </div>
        </>
      ) }
    </div>
  )
}

export default DefaultModal;

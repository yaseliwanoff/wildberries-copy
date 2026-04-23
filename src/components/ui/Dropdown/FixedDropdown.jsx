import { createPortal } from "react-dom";
import styles from "../../layout/Header/Header.module.scss";

// TODO: Вариант на запас из Top.jsx, переписать если нужно будет
const FixedDropdown = ({ pos, children, onClose }) => {
  return createPortal(
    <div
      className={styles.dropdown_menu_fixed}
      style={{ top: pos.top, left: pos.left }}
    >
      {children}
    </div>,
    document.body
  );
};

export default FixedDropdown;

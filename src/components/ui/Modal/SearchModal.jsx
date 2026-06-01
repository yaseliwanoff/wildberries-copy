import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import SearchModalItems from "../../../mocks/header/search-modal";
import { useScrollLock } from "../../../hooks/useScrollLock";
import "./SearchModal.scss";

const SearchModal = ({ isVisible, onClose, headerHeight, searchingValue }) => {
  useScrollLock(isVisible);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="modal_background_black"
        style={{ top: headerHeight }}
        onClick={onClose}
      />
      <div className="modal_wrapper_search rounded-xl">
        <p className="modal_title">Часто ищут</p>
        <ul className="modal_inner_wrapper">
          {searchingValue.length >= 1 ? (
            <li className="modal_inner_item">
              <Link className="modal_inner_link">
                <Search className="modal_inner_icon" />
                <span>{searchingValue}</span>
              </Link>
            </li>
          ) : (
            SearchModalItems.map((item) => (
              <li key={item.id} className="modal_inner_item">
                <Link className="modal_inner_link">
                  <Search className="modal_inner_icon" />
                  <span>{item.title}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  );
};

export default SearchModal;

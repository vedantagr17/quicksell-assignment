import { useState } from "react";
import DisplayIcon from "../../assets/Display.svg";
import DownIcon from "../../assets/down.svg";
import { GROUP_BY, SORT_BY } from "../../constants";

const Header = ({ onDisplayChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [grouping, setGrouping] = useState(() => {
    return localStorage.getItem("grouping") || GROUP_BY.STATUS;
  });
  const [sorting, setSorting] = useState(() => {
    return localStorage.getItem("sorting") || SORT_BY.PRIORITY;
  });

  const handleGroupingChange = (e) => {
    const newGrouping = e.target.value;
    setGrouping(newGrouping);
    localStorage.setItem("grouping", newGrouping);
    onDisplayChange(newGrouping, sorting);
  };

  const handleSortingChange = (e) => {
    const newSorting = e.target.value;
    setSorting(newSorting);
    localStorage.setItem("sorting", newSorting);
    onDisplayChange(grouping, newSorting);
  };

  return (
    <div className="header">
      <button className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <img src={DisplayIcon} alt="" />
        Display
        <img src={DownIcon} alt="" />
      </button>

      {isOpen && (
        <div className="display-options">
          <div className="option-group">
            <label>Grouping</label>
            <select value={grouping} onChange={handleGroupingChange}>
              <option value={GROUP_BY.STATUS}>Status</option>
              <option value={GROUP_BY.USER}>User</option>
              <option value={GROUP_BY.PRIORITY}>Priority</option>
            </select>
          </div>

          <div className="option-group">
            <label>Ordering</label>
            <select value={sorting} onChange={handleSortingChange}>
              <option value={SORT_BY.PRIORITY}>Priority</option>
              <option value={SORT_BY.TITLE}>Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

import React from "react";
import "../CSS/ExportFilterModal.css";

const ExportFilterModal = ({ isOpen, onClose, onConfirm }) => {
  const [selectedFilter, setSelectedFilter] = React.useState("all");
  const [selectedSort, setSelectedSort] = React.useState("frequency");

  const handleSubmit = () => {
    onConfirm(selectedFilter, selectedSort);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("export-modal-overlay")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="export-modal-overlay" onClick={handleOverlayClick}>
      <div className="export-modal">
        <button className="close-btn" onClick={onClose}>×</button>

        <h2>Export Settings</h2>

        <label>Filter Questions:</label>
        <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="done">Done Only</option>
          <option value="revision">Revision Only</option>
          <option value="below5">Marks &lt; 5</option>
          <option value="above5">Marks ≥ 5</option>
        </select>

        <label>Sort By:</label>
        <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}>
          <option value="marks">Marks</option>
          <option value="frequency">Frequency</option>
        </select>

        <div className="modal-actions">
          <button onClick={handleSubmit} className="confirm-btn">Generate PDF</button>
          <button onClick={onClose} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};


export default ExportFilterModal;

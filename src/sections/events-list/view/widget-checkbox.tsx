import React from "react";

const categories = [
  "all",
  "Screening",
  "meetings",
  "PerhtmlFormances",
  "workshops",
  "Exhibitions",
  "music shows",
  "comedy shows",
  "Award shows",
];

const WidgetCheckbox: React.FC = () => {
  return (
    <div className="widget-1 widget-check">
      <div className="widget-header">
        <h5 className="m-title">Filter By</h5>{" "}
        <a href="#0" className="clear-check">
          Clear All
        </a>
      </div>
      <div className="widget-1-body">
        <h6 className="subtitle">categories</h6>
        <div className="check-area">
          {categories.map((category, index) => (
            <div className="form-group" key={index}>
              <input type="checkbox" name="lang" id={`cat${index + 1}`} />
              <label htmlFor={`cat${index + 1}`}>{category}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WidgetCheckbox;

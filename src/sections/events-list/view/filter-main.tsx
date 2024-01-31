const FilterMain = () => {
  return (
    <div className="filter-area">
      <div className="filter-main">
        <div className="left w-100 justify-content-between">
          <div className="item">
            <span className="show">Show :</span>
            <select className="select-bar">
              <option value="12">12</option>
              <option value="15">15</option>
              <option value="18">18</option>
              <option value="21">21</option>
              <option value="24">24</option>
              <option value="27">27</option>
              <option value="30">30</option>
            </select>
          </div>
          <div className="item mr-0">
            <span className="show">Sort By :</span>
            <select className="select-bar">
              <option value="showing">now showing</option>
              <option value="exclusive">exclusive</option>
              <option value="trending">trending</option>
              <option value="most-view">most view</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMain;

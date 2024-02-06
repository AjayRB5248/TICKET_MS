const EventPagination: React.FC = () => (
  <div className="pagination-area text-center">
    <a href="#0">
      <i className="fas fa-angle-double-left"></i>
      <span>Prev</span>
    </a>
    <a href="#0">1</a>
    <a href="#0">2</a>
    <a href="#0" className="active">
      3
    </a>
    <a href="#0">4</a>
    <a href="#0">5</a>
    <a href="#0">
      <span>Next</span>
      <i className="fas fa-angle-double-right"></i>
    </a>
  </div>
);

export default EventPagination;

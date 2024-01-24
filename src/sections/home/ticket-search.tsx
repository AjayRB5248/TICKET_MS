import Image from "next/image";
import MovieTicket from "src/assets/frontend/images/ticket/ticket-tab01.png";
import EventsTicket from "src/assets/frontend/images/ticket/ticket-tab02.png";
import SportsTicket from "src/assets/frontend/images/ticket/ticket-tab03.png";
import CityImg from "src/assets/frontend/images/ticket/city.png";
import DateImg from "src/assets/frontend/images/ticket/date.png";
import CinemaImg from "src/assets/frontend/images/ticket/cinema.png";
import TicketSearchBg from "src/assets/frontend/images/event3.jpg";
import withNiceSelect from "src/layouts/_common/nice-select/withNiceSelect";
const ticketTabItems = [
  {
    label: "Movie",
    img: MovieTicket,
  },
  {
    label: "events",
    img: EventsTicket,
  },
  {
    label: "sports",
    img: SportsTicket,
  },
];

const TicketSearch = () => {
  return (
    <section className="search-ticket-section padding-top pt-lg-0">
      <div className="container">
        <div className="search-tab bg_img" style={{ backgroundImage: `url(${TicketSearchBg.src})` }}>
          <div className="row align-items-center mb--20">
            <div className="col-lg-6 mb-20">
              <div className="search-ticket-header">
                <h6 className="category">welcome to Hulya Events</h6>
                <h3 className="title">what are you looking for</h3>
              </div>
            </div>
            <div className="col-lg-6 mb-20">
              <ul className="tab-menu ticket-tab-menu">
                {ticketTabItems.map((item, index) => (
                  <li className="active" key={index}>
                    <div className="tab-thumb">
                      <Image src={item.img} alt="ticket" />
                    </div>
                    <span>movie</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tab-area">
            <div className="tab-item active">
              <form className="ticket-search-form">
                <div className="form-group large">
                  <input type="text" placeholder="Search for Movies" />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                <div className="form-group">
                  <div className="thumb">
                    <Image src={CityImg} alt="ticket" />
                  </div>
                  <span className="type">city</span>
                  <select className="select-bar">
                    <option value="london">Sydney</option>
                    <option value="dhaka">Perth</option>
                    <option value="rosario">Melbourne</option>
                    <option value="madrid">Darwin</option>
                    <option value="koltaka">Adelaide</option>
                    <option value="rome">Brisbane</option>
                    <option value="khoksa">Gold Coast</option>
                  </select>
                </div>
                <div className="form-group">
                  <div className="thumb">
                    <Image src={DateImg} alt="ticket" />
                  </div>
                  <span className="type">date</span>
                  <select className="select-bar">
                    <option value="26-12-19">23/10/2020</option>
                    <option value="26-12-19">24/10/2020</option>
                    <option value="26-12-19">25/10/2020</option>
                    <option value="26-12-19">26/10/2020</option>
                  </select>
                </div>
                <div className="form-group">
                  <div className="thumb">
                    <Image src={CinemaImg} alt="ticket" />
                  </div>
                  <span className="type">Location</span>
                  <select className="select-bar">
                    <option value="Awaken">Opera House</option>
                    <option value="dhaka">Enmore theatre</option>
                    <option value="rosario">City Recital Hall</option>
                    <option value="madrid">Hamer Hall</option>
                    <option value="koltaka">Palias Theatre</option>
                    <option value="rome">Corner Hotel</option>
                    <option value="khoksa">Arts Center Melbourne</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="tab-item">
              <form className="ticket-search-form">
                <div className="form-group large">
                  <input type="text" placeholder="Search for Events" />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                <div className="form-group">
                  <div className="thumb">
                    <Image src={CityImg} alt="ticket" />
                  </div>
                  <span className="type">city</span>
                  <select className="select-bar">
                    <option value="london">London</option>
                    <option value="dhaka">dhaka</option>
                    <option value="rosario">rosario</option>
                    <option value="madrid">madrid</option>
                    <option value="koltaka">kolkata</option>
                    <option value="rome">rome</option>
                    <option value="khoksa">khoksa</option>
                  </select>
                </div>
                <div className="form-group">
                  <div className="thumb">
                    <Image src={DateImg} alt="ticket" />
                  </div>
                  <span className="type">date</span>
                  <select className="select-bar">
                    <option value="26-12-19">23/10/2020</option>
                    <option value="26-12-19">24/10/2020</option>
                    <option value="26-12-19">25/10/2020</option>
                    <option value="26-12-19">26/10/2020</option>
                  </select>
                </div>
                <div className="form-group">
                  <div className="thumb">
                    <Image src={CinemaImg} alt="ticket" />
                  </div>
                  <span className="type">event</span>
                  <select className="select-bar">
                    <option value="angular">angular</option>
                    <option value="startup">startup</option>
                    <option value="rosario">rosario</option>
                    <option value="madrid">madrid</option>
                    <option value="koltaka">kolkata</option>
                    <option value="Last-First">Last-First</option>
                    <option value="wish">wish</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="tab-item">
              <form className="ticket-search-form">
                <div className="form-group large">
                  <input type="text" placeholder="Search fo Sports" />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                <div className="form-group">
                  <div className="thumb">
                    <Image src={CityImg} alt="ticket" />
                  </div>
                  <span className="type">city</span>
                  <select className="select-bar">
                    <option value="london">London</option>
                    <option value="dhaka">dhaka</option>
                    <option value="rosario">rosario</option>
                    <option value="madrid">madrid</option>
                    <option value="koltaka">kolkata</option>
                    <option value="rome">rome</option>
                    <option value="khoksa">khoksa</option>
                  </select>
                </div>
                <div className="form-group">
                  <div className="thumb">
                    <Image src={DateImg} alt="ticket" />
                  </div>
                  <span className="type">date</span>
                  <select className="select-bar">
                    <option value="26-12-19">23/10/2020</option>
                    <option value="26-12-19">24/10/2020</option>
                    <option value="26-12-19">25/10/2020</option>
                    <option value="26-12-19">26/10/2020</option>
                  </select>
                </div>
                <div className="form-group">
                  <div className="thumb">
                    <Image src={CinemaImg} alt="ticket" />
                  </div>
                  <span className="type">sports</span>
                  <select className="select-bar">
                    <option value="football">football</option>
                    <option value="cricket">cricket</option>
                    <option value="cabadi">cabadi</option>
                    <option value="madrid">madrid</option>
                    <option value="gadon">gadon</option>
                    <option value="rome">rome</option>
                    <option value="khoksa">khoksa</option>
                  </select>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withNiceSelect(TicketSearch);

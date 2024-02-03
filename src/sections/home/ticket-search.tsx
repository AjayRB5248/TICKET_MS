import Image from "next/image";
import MovieTicket from "src/assets/frontend/images/ticket/ticket-tab01.png";
import EventsTicket from "src/assets/frontend/images/ticket/ticket-tab02.png";
import SportsTicket from "src/assets/frontend/images/ticket/ticket-tab03.png";
import CityImg from "src/assets/frontend/images/ticket/city.png";
import DateImg from "src/assets/frontend/images/ticket/date.png";
import CinemaImg from "src/assets/frontend/images/ticket/cinema.png";
import TicketSearchBg from "src/assets/frontend/images/event3.jpg";
import withNiceSelect from "src/layouts/_common/nice-select/withNiceSelect";
import { SelectField } from "src/components/select-field";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useFetchEvents } from "src/api/events";
import { useEventsContext } from "src/context/EventsContextProvider";
import EventsService from "src/services/events";

interface Filters {
  eventName: string;
  city: string;
  eventDate: string;
  venueName: string;
}

const ticketTabItems = [
  {
    label: "Concerts",
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

const selectFields = [
  {
    label: "city",
    imageSrc: CityImg,
    altText: "City",
    options: [
      { value: "sydney", label: "Sydney" },
      { value: "melbourne", label: "Melbourne" },
      { value: "brisbane", label: "Brisbane" },
      { value: "perth", label: "Perth" },
      { value: "adelaide", label: "Adelaide" },
      { value: "gold coast", label: "Gold Coast" },
      { value: "canberra", label: "Canberra" },
      { value: "newcastle", label: "Newcastle" },
      { value: "hobart", label: "Hobart" },
      { value: "darwin", label: "Darwin" },
      { value: "cairns", label: "Cairns" },
      { value: "townsville", label: "Townsville" },
      { value: "wollongong", label: "Wollongong" },
      { value: "geelong", label: "Geelong" },
      { value: "ballarat", label: "Ballarat" },
      { value: "toowoomba", label: "Toowoomba" },
      { value: "sunshine coast", label: "Sunshine Coast" },
      { value: "mackay", label: "Mackay" },
      { value: "rockhampton", label: "Rockhampton" },
      { value: "bendigo", label: "Bendigo" },
    ],
  },
  {
    label: "date",
    imageSrc: DateImg,
    altText: "Date",
    options: [
      { value: "all", label: "All" },
      { value: "23-10-2020", label: "23/10/2020" },
      { value: "24-10-2020", label: "24/10/2020" },
      { value: "25-10-2020", label: "25/10/2020" },
      { value: "26-10-2020", label: "26/10/2020" },
      // Add more date options here
    ],
  },
  {
    label: "Location",
    imageSrc: CinemaImg,
    altText: "Location",
    options: [
      { value: "all", label: "All" },
      { value: "opera-house", label: "Opera House" },
      { value: "enmore-theatre", label: "Enmore Theatre" },
      { value: "city-recital-hall", label: "City Recital Hall" },
      // Add more location options here
    ],
  },
];

const TicketSearch = () => {
  const { events, filters, setFilters, setEvents } = useEventsContext();

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const handleSelectChange = (field: string, value: string) => {
    if (field === "city") {
      setSelectedCity(value);
    } else if (field === "date") {
      setSelectedDate(value);
    } else if (field === "Location") {
      setSelectedLocation(value);
    }
  };

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const callFilterEventsAPI = async () => {
    const queryData: Filters = {
      eventName: searchText,
      city: selectedCity,
      eventDate: selectedDate,
      venueName: selectedLocation,
    };

    setFilters(queryData);

    // API call with the queryData above and setEvent
    const events = await EventsService.list(queryData)
      .then((res) => res.data?.events)
      .catch((err) => {
        console.log(err, "err===");
      });
    console.log(events, "events====");
    setEvents(events);
  };

  const handleSearchButtonClick = (e: FormEvent) => {
    e.preventDefault();
    callFilterEventsAPI();
  };

  useEffect(() => {
    callFilterEventsAPI();
  }, [selectedCity, selectedDate, selectedLocation]);

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
                    <span>{item?.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tab-area">
            <div className="tab-item active">
              <form className="ticket-search-form">
                <div className="form-group large">
                  <input
                    type="text"
                    placeholder="Search for Events"
                    value={searchText}
                    onChange={handleSearchTextChange}
                  />
                  <button type="submit" onClick={handleSearchButtonClick}>
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                {selectFields.map((field, index) => (
                  <SelectField
                    key={index}
                    imageSrc={field.imageSrc}
                    altText={field.altText}
                    label={field.label}
                    options={field.options}
                    onSelectChange={(label: string, value: string) => handleSelectChange(label, value)}
                  />
                ))}
              </form>
            </div>
            {/* <div className="tab-item">
              <form className="ticket-search-form">
                <div className="form-group large">
                  <input type="text" placeholder="Search for Events" />
                  <button type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                {selectFields.map((field, index) => (
                  <SelectField
                    key={index}
                    imageSrc={field.imageSrc}
                    altText={field.altText}
                    label={field.label}
                    options={field.options}
                    onSelectChange={(value) => handleSelectChange(field.label, value)}
                  />
                ))}
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
                {selectFields.map((field, index) => (
                  <SelectField
                    key={index}
                    imageSrc={field.imageSrc}
                    altText={field.altText}
                    label={field.label}
                    options={field.options}
                    onSelectChange={(value) => handleSelectChange(field.label, value)}
                  />
                ))}
              </form>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default withNiceSelect(TicketSearch);
